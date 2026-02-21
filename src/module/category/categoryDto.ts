import { CategoryInterface } from "./categoryModel";

export interface CreateCategoryRequest{
    name: string;
}

export interface GetAllCategoriesRequest{
    sortBy: string;
    order: string;
    limit: number;
    offset: number;
}

export interface CategoriesResponse{
    search?: string;
    sortBy: string;
    order: string;
    limit: number;
    offset: number;
    categories: CategoryInterface[];
}

export interface GetCategoriesByNameRequest{
    name: string;
    sortBy: string;
    order: string;
    limit: number;
    offset: number;
}