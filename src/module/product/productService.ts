import mongoose from "mongoose";
import AppError from "../../util/appError"
import { deleteFromCloudinary, uploadToCloudinary } from "../../util/cloudinaryUtil";
import * as productRepository from './productRepository';
import { nanoid } from "nanoid";
import { getCategoriesIdByShortCode, asignProductsToCategory, removeProductFromCategory } from "../category/categoryRepository";
import { ProductsResponse } from "./productDto";

export const createProduct = async (name: string, categories: string[], image: Express.Multer.File, description?: string) => {
    if (!image) { 
        throw new AppError('Image tidak ada', 400);
    };
    const session = await mongoose.startSession();
    let uploadResult: { public_id: string; secure_url: string } | null = null;
    let shortCode: string;
    try{
        uploadResult = await uploadToCloudinary(image.buffer, 'adabarang/product');
        await session.withTransaction(async () => {
            const categoriesId = await getCategoriesIdByShortCode(categories, {session});
            shortCode = await createShortCode();
            const product = await productRepository.create({name, description, imagePublicId: uploadResult!.public_id, imagePublicUrl: uploadResult!.secure_url, shortCode}, {session})
            await Promise.all([
                asignProductsToCategory(categories, product._id, {session}),
                productRepository.asignCategoriesToProduct(shortCode, categoriesId, {session})
            ])

        })
    } catch(error){
        if (uploadResult?.public_id) {
            await deleteFromCloudinary(uploadResult.public_id);
        }
        throw error;
    } finally{
        session.endSession()
    }

    return await productRepository.findByShortCode(shortCode!);   
}

export const deleteProductFromCategory = async (productShortCode: string, categoriesShortCodes: string[]) => {
    const session = await mongoose.startSession();

    try{
        const categoriesId = await getCategoriesIdByShortCode(categoriesShortCodes, {session});
        const product = await productRepository.findByShortCode(productShortCode, {session});
        if (!product) throw new AppError('Produk tidak ada', 400);
        await Promise.all([
            productRepository.removeCategoryFromProduct(productShortCode, categoriesId, {session}),
            removeProductFromCategory(categoriesShortCodes, product?._id, {session})
        ])
    }finally{
        session.endSession();
    }

    return await productRepository.findByShortCode(productShortCode);
}

export const deleteProduct = async (shortCode: string) => {
    const result = await productRepository.deleteProduct(shortCode);
    if (!result) throw new AppError('Produk tidak ada', 404)
} 

export const updateProduct = async (shortCode: string, name?: string, categories?: string[], image?: Express.Multer.File, description?: string)=> {
    const session = await mongoose.startSession();
    let updateDataProduct : {name?: string, description?: string, imagePublicId?: string, imagePublicUrl?: string} = {};
    const product = await productRepository.findByShortCode(shortCode);
    if (!product) throw new AppError('Produk tidak ada', 404)
    if (image){
        const uploadResult = await uploadToCloudinary(image.buffer, 'adabarang/product');
        updateDataProduct.imagePublicId = uploadResult.public_id;
        updateDataProduct.imagePublicUrl = uploadResult.secure_url;
    }
    if (name){
        updateDataProduct.name = name;
    }
    if (description){
        updateDataProduct.description = description;
    } 
    try{
        await session.withTransaction(async () => {
            if (categories){
                const categoriesId = await getCategoriesIdByShortCode(categories, {session});
                if (!categoriesId) throw new AppError('Kategori tidak ada', 404);
                await Promise.all([
                    productRepository.asignCategoriesToProduct(shortCode, categoriesId, {session}),
                    asignProductsToCategory(categories, product._id, {session})
                ]);
            }
            if (image || name || description){
                await productRepository.updateProduct(shortCode, updateDataProduct, {session})
            }
            await deleteFromCloudinary(product.imagePublicId);            
        })
    } catch(error){
        if (updateDataProduct.imagePublicId){
            await deleteFromCloudinary(updateDataProduct.imagePublicId);
        }
    }
    finally{
        session.endSession();
    }
    return await productRepository.findByShortCode(shortCode);
}

export const getAllProducts = async(name: string| undefined, isActive: boolean, sortBy: string, order: string, limit: number, offset: number): Promise<ProductsResponse> => {
    const products = await productRepository.getAllProduct(name, isActive, sortBy, order, limit, offset);
    if (products.length === 0) throw new AppError('Produk belum ada', 404);
    return{
        search: name,
        isActive,
        sortBy,
        order,
        limit,
        offset,
        products

    }
}

const createShortCode = async () : Promise<string> => {
    let shortCode: string;
    let exist = true;
    while (exist){
        shortCode = nanoid(7);
        exist = !!(await productRepository.findByShortCode(shortCode));
    }
    return shortCode!;

}