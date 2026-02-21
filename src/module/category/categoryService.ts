import AppError from '../../util/appError';
import { GetAllCategoriesResponse } from './categoryDto';
import * as categoryRepository from './categoryRepository';

export const createCategory = async (name: string) => {
    const checkCategory = await categoryRepository.getCategoryByName(name);
    if (checkCategory) throw new AppError('Kategori sudah ada', 400);
    const category = await categoryRepository.createCategory({name});
    return category;
}

export const gelAllCategories = async(sortBy: string, order: string, limit: number, offset: number): Promise<GetAllCategoriesResponse> => {
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