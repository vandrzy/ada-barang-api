import AppError from '../../util/appError';
import * as categoryRepository from './categoryRepository';

export const createCategory = async (name: string) => {
    const checkCategory = await categoryRepository.getCategoryByName(name);
    if (checkCategory) throw new AppError('Kategori sudah ada', 400);
    const category = await categoryRepository.createCategory({name});
    return category;
}