import mongoose from "mongoose";
import AppError from "../../util/appError"
import { deleteFromCloudinary, uploadToCloudinary } from "../../util/cloudinaryUtil";
import * as productRepository from './productRepository';
import { nanoid } from "nanoid";
import { getCategoriesIdByShortCode, asignProductsToCategory } from "../category/categoryRepository";

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

const createShortCode = async () : Promise<string> => {
    let shortCode: string;
    let exist = true;
    while (exist){
        shortCode = nanoid(7);
        exist = !!(await productRepository.findByShortCode(shortCode));
    }
    return shortCode!;

}