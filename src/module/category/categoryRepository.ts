import { SortOrder } from "mongoose";
import Category, { CategoryInterface } from "./categoryModel";

export const createCategory = async (data: {name: string}): Promise<CategoryInterface> => {
    return await Category.create(data);
}

export const getCategoryByName = async(name: string): Promise<CategoryInterface| null> => {
    return await Category.findOne({name: {$regex: `^${name}$`, $options: 'i'}});
}

export const gelAllCategories = async(sortBy: string, order: string, limit: number, offset: number): Promise<CategoryInterface[]> => {
    const orderType = order as SortOrder
    return await Category.find().sort({[sortBy]: orderType}).limit(limit).skip(offset);
}