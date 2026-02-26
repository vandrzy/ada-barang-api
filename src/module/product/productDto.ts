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