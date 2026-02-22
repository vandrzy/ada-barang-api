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

export const getAllCategories = async(name: string| undefined, isActive: boolean, sortBy: string, order: string, limit: number, offset: number): Promise<CategoriesResponse> => {
    const categories = await categoryRepository.getAllCategories(name, isActive, sortBy, order, limit,  offset);
    if (categories.length === 0) throw new AppError('Kategori belum ada', 404);
    return {
        search: name,
        isActive,
        sortBy,
        order,
        limit,
        offset,
        categories
    };
}

export const deleteCategory = async(shortCode: string) => {
    const deletedCategory = await categoryRepository.deleteCategory(shortCode);
    if (!deletedCategory) throw new AppError('Kategori tidak ada', 404);
}

export const activateCategory = async(shortCode: string) => {
    const deletedCategory = await categoryRepository.activateCategory(shortCode);
    if (!deletedCategory) throw new AppError('Kategori tidak ada', 404);
}

export const updateCategory = async(shortCode: string, name: string) => {
    const checkCategory = await categoryRepository.getCategoryByName(name);
    if (checkCategory && checkCategory.shortCode !== shortCode) throw new AppError('Nama sudah digunakan', 400);
    const updatedCategory = await categoryRepository.updateCategory(shortCode, name);
    if (!updatedCategory) throw new AppError('Kategori tidak ada', 404);
    return updatedCategory;
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