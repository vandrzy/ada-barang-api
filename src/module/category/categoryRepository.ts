import { SortOrder } from "mongoose";
import Category, { CategoryInterface } from "./categoryModel";

export const createCategory = async (data: {name: string, shortCode: string}): Promise<CategoryInterface> => {
    return await Category.create(data);
}

export const getCategoryByName = async(name: string): Promise<CategoryInterface| null> => {
    return await Category.findOne({name: {$regex: `^${name}$`, $options: 'i'}});
}

export const gelAllCategories = async(sortBy: string, order: string, limit: number, offset: number): Promise<CategoryInterface[]> => {
    const orderType = order as SortOrder
    return await Category.find().sort({[sortBy]: orderType}).limit(limit).skip(offset);
}

export const getCategoriesByName = async(name: string,sortBy: string, order: string, limit: number, offset: number): Promise<CategoryInterface[]> => {
    const orderType = order as SortOrder;
    return await Category.find({name: {$regex: name, $options: 'i'}}).sort({[sortBy]: orderType}).limit(limit).skip(offset);
}

export const getCategoryByShortCode = async (shortCode: string) => {
    return await Category.findOne({shortCode});
}

export const checkCategory = async (shortCode: string): Promise<boolean> => {
    return !!(await Category.exists({shortCode}));
}