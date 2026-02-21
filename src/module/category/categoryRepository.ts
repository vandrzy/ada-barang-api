import Category, { CategoryInterface } from "./categoryModel";

export const createCategory = async (data: {name: string}): Promise<CategoryInterface> => {
    return await Category.create(data);
}

export const getCategoryByName = async(name: string): Promise<CategoryInterface| null> => {
    return await Category.findOne({name: {$regex: `^${name}$`, $options: 'i'}});
}