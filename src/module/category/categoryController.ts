import { Request, Response } from 'express';
import { asyncHandler } from '../../util/asyncHandler';
import * as categoryService from './categoryService';
import { CreateCategoryRequest, GetAllCategoriesRequest, GetCategoriesByNameRequest } from './categoryDto';
import { successResponse } from '../../util/response';

export const createCategory = asyncHandler(async (req: Request<{}, {}, CreateCategoryRequest>, res: Response) => {
    const name = req.body.name.toLowerCase();
    const category = await categoryService.createCategory(name);
    res.status(201).json(successResponse('Berhasil menambahkan kategori', category));
})

export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const {sortBy, order, limit, offset} = req.validatedQuery as GetAllCategoriesRequest;
    const result = await categoryService.gelAllCategories(sortBy, order, limit, offset);
    res.status(200).json(successResponse('Berhasil menampilkan data kategori', result));
})

export const getCategoriesByName = asyncHandler(async(req: Request, res: Response) =>{
    const {name, sortBy, order, limit, offset} = req.validatedQuery as GetCategoriesByNameRequest;
    const result = await categoryService.getCategoriesByName(name, sortBy, order, limit, offset);
    res.status(200).json(successResponse(`Berhasil menemukan kategori dengan nama: ${name}`, result))
})