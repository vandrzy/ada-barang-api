import { Request, Response } from 'express';
import { asyncHandler } from '../../util/asyncHandler';
import * as productService from './productService';
import { CreateProductInterface, DeleteCategoriesFromProductParams, DeleteCategoriesFromProductRequest } from './productDto';
import { successResponse } from '../../util/response';

export const createProduct = asyncHandler(async (req: Request<{}, {}, CreateProductInterface>, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'Image wajib diupload'
      });
    }
    const image = req.file;
    const {name, description, categories} = req.body;
    const result = await productService.createProduct(name, categories, image, description)
    res.status(201).json(successResponse('Berhasil menambahkan produk', result))
})

export const deleteCategoriesFromProduct = asyncHandler(async (req: Request<{}, {}, DeleteCategoriesFromProductRequest>, res: Response) => {
  const {shortCode} =req.params as DeleteCategoriesFromProductParams;
  const {categoriesShortCode} = req.body;

  const result = await productService.deleteProductFromCategory(shortCode, categoriesShortCode);
})