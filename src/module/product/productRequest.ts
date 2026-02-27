import z, { array } from "zod";

export const createProductRequest = z.object({
    name: z
    .string()
    .min(3, 'Nama produk minimal 3 karakter')
    .max(100),
  description: z
    .string()
    .max(500)
    .optional(),
  categories: z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(
      z.array(
        z.string().min(1, 'Kategori tidak boleh kosong')
      ).min(1, 'Minimal 1 kategori')
    )
    
})

export const updateProductBody = z.object({
  name: z
    .string()
    .min(1, 'Name tidak boleh kosong')
    .optional(),

  description: z
    .string()
    .min(1, 'Description tidak boleh kosong')
    .optional(),

  addCategories: z
    .array(z.string().min(1, 'Category tidak boleh kosong'))
    .nonempty('addCategories tidak boleh kosong')
    .optional(),
});


export const deleteCategoriesFromProductBody = z.object({
  categoriesShortCode: z.string().transform((val) => JSON.parse(val)).pipe(z.array(z.string().min(1, 'Kategori tidak boleh kosong')).min(1, 'Minimal 1 ketegori'))
});

export const shortCodeProductParams = z.object({
  shortCode: z.string().min(5)
});

export const getAllProductsQuery = z.object({
    name: z.string().min(3).max(10).optional(),
    isActive: z.string().optional().transform(val => {
        if (val === undefined) return true;
        return val === 'true';
    }),
    sortBy: z.enum(['name', 'createdAt']).optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
    limit: z.coerce.number('limit harus angka').int().min(1).max(100).optional().default(5),
    offset: z.coerce.number('offset harus angka').int().min(0).optional().default(0)
})