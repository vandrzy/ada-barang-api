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

export interface GetAllCategoriesResponse{
    sortBy: string;
    order: string;
    limit: number;
    offset: number;
    categories: CategoryInterface[];
}