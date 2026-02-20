import z from "zod";

export const registrasiBody = z.object({
    username: z.string().min(5).max(10),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(3).max(8)
})