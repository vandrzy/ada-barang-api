import AppError from '../../util/appError';
import { CategoriesResponse } from './categoryDto';
import * as categoryRepository from './categoryRepository';
import {nanoid} from 'nanoid';
export const createCategory = async (name: string) => {
    const checkCategory = await categoryRepository.getCategoryByName(name);
    if (checkCategory) throw new AppError('Kategori sudah ada', 400);
    const shortCode = await generateShortCode();
    const category = await categoryRepository.createCategory({name, shortCode});
    return category;
}

export const gelAllCategories = async(sortBy: string, order: string, limit: number, offset: number): Promise<CategoriesResponse> => {
    const categories = await categoryRepository.gelAllCategories(sortBy, order, limit,  offset);
    if (categories.length === 0) throw new AppError('Kategori belum ada', 404);
    return {
        sortBy,
        order,
        limit,
        offset,
        categories
    };
}

export const getCategoriesByName = async (name: string, sortBy: string, order: string, limit: number, offset: number): Promise<CategoriesResponse> => {
    const categories = await categoryRepository.getCategoriesByName(name, sortBy, order, limit, offset);
    if (categories.length === 0) throw new AppError('Ketegori tidak ada', 404);
    return{
        search: name,
        sortBy,
        order, 
        limit, 
        offset,
        categories
    }
}

const generateShortCode = async(): Promise<string> => {
    let shortCode: string;
    let exist = true;
    while (exist) {
        shortCode = nanoid(7);
        exist = await categoryRepository.checkCategory(shortCode);
    };
    return shortCode!;
}