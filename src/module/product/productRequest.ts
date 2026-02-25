import z from "zod";

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