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