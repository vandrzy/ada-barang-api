import RepoOptions from "../../util/repoOptions";
import Product, { ProductInterface } from "./productModel";
import mongoose from "mongoose";

export const create = async (data: {
    name: string,
    description?:string,
    imagePublicId?: string,
    imagePublicUrl?: string,
    shortCode: string
}, options: RepoOptions):Promise<ProductInterface> => {
    const [product] =  await Product.create([data], {session: options.session});
    return product!;
}

export const asignCategoriesToProduct = async (shortCode: string, categories: mongoose.Types.ObjectId[], options?: RepoOptions) => {
    return await Product.findOneAndUpdate({shortCode}, {$addToSet: {categories: {$each: categories}}}, {new: true, session: options?.session})
}

export const findByShortCode = async (shortCode: string, options?: RepoOptions)=> {
    return await Product.findOne({shortCode}, {session: options?.session})
}

export const removeCategoryFromProduct = async (shortCode: string, categoriesId: mongoose.Types.ObjectId[], options: RepoOptions) => {
    return await Product.findOneAndUpdate({shortCode, isActive: true}, {$pull: {categories: {$in: categoriesId}}}, {new: true, session: options.session})
}

export const deleteProduct = async (shortCode: string) => {
    return await Product.findOneAndUpdate({shortCode, isActive: true}, {isActive: false}, {new: true});
}

export const updateProduct = async (shortCode: string, data: {name?: string, description?: string, imagePublicId?: string, imagePublicUrl?: string}, options: RepoOptions) => {
    return await Product.findOneAndUpdate({shortCode, isActive: true}, {data}, {new: true, session: options.session})
}