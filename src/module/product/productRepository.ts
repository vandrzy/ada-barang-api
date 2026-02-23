import RepoOptions from "../../util/repoOptions";
import Product from "./productModel";
import mongoose from "mongoose";

export const create = async (data: {
    name: string,
    description?:string,
    imagePublicId?: string,
    imagePublicUrl?: string,
    shortCode: string
}, options: RepoOptions) => {
    return await Product.create(data, {$session: options.session});
}

export const asignCategoriesToProduct = async (shortCode: string, categories: mongoose.Schema.Types.ObjectId[], options?: RepoOptions) => {
    return await Product.findOneAndUpdate({shortCode}, {$addToSet: {categories: {$each: categories}}}, {new: true, session: options?.session})
}