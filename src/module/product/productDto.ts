export interface CreateProductInterface {
    name: string;
    description?: string;
    categories: string[];
}
export interface DeleteCategoriesFromProductRequest {
    categoriesShortCode: string[];
}
export interface DeleteCategoriesFromProductParams {
    shortCode: string;
}