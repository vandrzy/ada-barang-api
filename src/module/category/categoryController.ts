import { Request, Response } from 'express';
import { asyncHandler } from '../../util/asyncHandler';
import * as categoryService from './categoryService';
import { CreateCategoryRequest, ShortCodeCategoryRequest, GetAllCategoriesRequest, UpdateCategoryRequest} from './categoryDto';
import { successResponse } from '../../util/response';

export const createCategory = asyncHandler(async (req: Request<{}, {}, CreateCategoryRequest>, res: Response) => {
    const name = req.body.name.toLowerCase();
    const category = await categoryService.createCategory(name);
    res.status(201).json(successResponse('Berhasil menambahkan kategori', category));
})

export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const {name, isActive, sortBy, order, limit, offset} = req.validatedQuery as GetAllCategoriesRequest;
    const result = await categoryService.getAllCategories(name, isActive, sortBy, order, limit, offset);
    res.status(200).json(successResponse('Berhasil menampilkan data kategori', result));
})

export const deleteCategory = asyncHandler(async(req: Request, res: Response) => {
    const {shortCode} = req.validatedQuery as ShortCodeCategoryRequest;
    await categoryService.deleteCategory(shortCode);
    res.status(200).json(successResponse('Berhasil menghapus kategori'));
})

export const updateCategory = asyncHandler(async(req: Request<{}, {}, UpdateCategoryRequest>, res: Response) => {
    const {shortCode} = req.validatedQuery as ShortCodeCategoryRequest;
    const name = req.body.name.toLowerCase();
    const result = await categoryService.updateCategory(shortCode, name);
    res.status(200).json(successResponse('Berhasil mengedit kategori', result));
})