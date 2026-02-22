import { SortOrder } from "mongoose";
import Category, { CategoryInterface } from "./categoryModel";

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

export const deleteCategory = async (name: string) => {
    await Category.findOneAndUpdate({name}, {isActive: false});
}