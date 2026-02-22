import z from "zod";

export const createCategoryRequest = z.object({
    name: z.string().min(3).max(10)
});

export const deleteCategoryQuery = z.object({
    shortCode: z.string().min(7).max(10)
});

export const getAllCategoriesQuery = z.object({
    name: z.string().min(3).max(10).optional(),
    isActive: z.boolean().optional().default(true),
    sortBy: z.enum(['name', 'createdAt']).optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
    limit: z.coerce.number('limit harus angka').int().min(1).max(100).optional().default(5),
    offset: z.coerce.number('offset harus angka').int().min(0).optional().default(0)
})