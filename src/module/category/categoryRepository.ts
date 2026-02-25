import mongoose, { SortOrder, Types } from "mongoose";
import Category, { CategoryInterface } from "./categoryModel";
import RepoOptions from "../../util/repoOptions";

export const createCategory = async (data: {name: string, shortCode: string}): Promise<CategoryInterface> => {
    return await Category.create(data);
}

export const getCategoryByName = async(name: string): Promise<CategoryInterface| null> => {
    return await Category.findOne({name: {$regex: `^${name}$`, $options: 'i'}});
}

export const getAllCategories = async(name: string| undefined, isActive: boolean, sortBy: string, order: string, limit: number, offset: number): Promise<CategoryInterface[]> => {
    const orderType = order as SortOrder
    const filter = name ? {name: {$regex: name, $options: 'i'}, isActive} : {isActive};
    return await Category.find(filter).sort({[sortBy]: orderType}).limit(limit).skip(offset);
}

export const getCategoryByShortCode = async (shortCode: string) => {
    return await Category.findOne({shortCode});
}

export const checkCategory = async (shortCode: string): Promise<boolean> => {
    return !!(await Category.exists({shortCode}));
}

export const deleteCategory = async (shortCode: string) => {
    return await Category.findOneAndUpdate({shortCode, isActive: true}, {isActive: false});
}

export const activateCategory = async (shortCode: string) => {
    return await Category.findOneAndUpdate({shortCode, isActive: false}, {isActive: true});
}

export const updateCategory = async (shortCode:string, name: string) => {
    return await Category.findOneAndUpdate({shortCode, isActive: true}, {name}, {new: true});
}

export const asignProductsToCategory = async (shortCodes: string[], productId: mongoose.Types.ObjectId, options?: RepoOptions) => {
    return await Category.updateMany({shortCode: {$in: shortCodes}}, {$addToSet: {products: productId}}, {session: options?.session} )
}

export const getCategoriesIdByShortCode = async (shortCode: string[], options?: RepoOptions) : Promise<Types.ObjectId[]> => {
    const categoriesId = await Category.find({shortCode: {$in: shortCode}, isActive: true}, {_id: 1}, {session: options?.session})
    return categoriesId.map(category => category._id);
}