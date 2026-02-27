import { Request, Response } from 'express';
import { asyncHandler } from '../../util/asyncHandler';
import * as productService from './productService';
import { CreateProductInterface, DeleteCategoriesFromProductRequest, GetAllProductsRequest, ShortCodeProductParams, UpdateProductRequestBody } from './productDto';
import { failedResponse, successResponse } from '../../util/response';

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
  const {shortCode} =req.params as ShortCodeProductParams;
  const {categoriesShortCode} = req.body;

  const result = await productService.deleteProductFromCategory(shortCode, categoriesShortCode);
  res.status(200).json(successResponse('Berhasil menghapus ketegori', result))
})

export const deleteProduct = asyncHandler(async (req: Request<{}>, res: Response) => {
  const {shortCode} = req.params as ShortCodeProductParams;
  const result = await productService.deleteProduct(shortCode);
  res.status(200).json(successResponse('Berhasil menghapus produk'));
})

export const updateProduct = asyncHandler(async (req: Request<{}, {}, UpdateProductRequestBody>, res: Response) => {
  if (!req.file) {
    return res.status(400).json(failedResponse('Image wahib diupload'))
  }
  const {shortCode} = req.params as ShortCodeProductParams;
  const {name, description, addCategories} = req.body;
  const image = req.file
  const result = await productService.updateProduct(shortCode, name, addCategories, image, description);
  res.status(200).json(successResponse('Berhasil melakukan update produk', result));
})

export const getProducts = asyncHandler(async (req:Request<{}, {}>, res: Response) => {
  const {name, isActive, sortBy, order, limit, offset} = req.validatedQuery as GetAllProductsRequest;
  const result = await productService.getAllProducts(name, isActive, sortBy, order, limit, offset);
  res.status(200).json(successResponse('Berhasil mengambil data produk', result));

})

export const getProductByShortCode = asyncHandler(async (req: Request<{}>, res: Response) => {
  const {shortCode} = req.params as ShortCodeProductParams;
  const result = await productService.getProductByShortCode(shortCode);
  res.status(200).json(successResponse('Berhasil mengambil data produk', result))
})