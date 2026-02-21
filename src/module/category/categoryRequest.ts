import z from "zod";

export const createCategoryRequest = z.object({
    name: z.string().min(3).max(10)
});

export const getAllCategoriesQuery = z.object({
    sortBy: z.enum(['name', 'createdAt']).optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
    limit: z.coerce.number('limit harus angka').int().min(1).max(100).optional().default(5),
    offset: z.coerce.number('offset harus angka').int().min(0).optional().default(0)
})