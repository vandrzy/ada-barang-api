import z from "zod";

export const createCategoryRequest = z.object({
    name: z.string().min(3).max(10)
});