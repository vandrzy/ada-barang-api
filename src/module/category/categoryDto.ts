import { CategoryInterface } from "./categoryModel";

export interface CreateCategoryRequest{
    name: string;
}

export interface GetAllCategoriesRequest{
    name: string| undefined;
    isActive: boolean;
    sortBy: string;
    order: string;
    limit: number;
    offset: number;
}

export interface CategoriesResponse{
    search?: string;
    isActive: boolean;
    sortBy: string;
    order: string;
    limit: number;
    offset: number;
    categories: CategoryInterface[];
}