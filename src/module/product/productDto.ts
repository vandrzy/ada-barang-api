import { ProductInterface } from "./productModel";

export interface CreateProductInterface {
    name: string;
    description?: string;
    categories: string[];
}
export interface DeleteCategoriesFromProductRequest {
    categoriesShortCode: string[];
}
export interface ShortCodeProductParams {
    shortCode: string;
}
export interface UpdateProductRequestBody{
    name?: string;
    description?: string;
    addCategories?: string[];
}

export interface GetAllProductsRequest{
    name: string| undefined;
    isActive: boolean;
    sortBy: string;
    order: string;
    limit: number;
    offset: number;
}

export interface ProductsResponse{
    search?: string;
    isActive: boolean;
    sortBy: string;
    order: string;
    limit: number;
    offset: number;
    products: ProductInterface[];
}