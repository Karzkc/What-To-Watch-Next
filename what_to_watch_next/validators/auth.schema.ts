import mongoose, { Schema } from "mongoose";
import z, { email } from 'zod'

export const registerSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 2 characters" })
        .trim()
        .nonempty(),

    email: z.email({ message: "Invalid email address" })
        .trim()
        .nonempty(),

    password: z.string()
        .min(6, { message: "Password must be more than 6 characters!" })
        .trim()
});

export const loginSchema = z.object({
    email: z.email("Invalid email address").trim().nonempty(),
    password: z.string().min(6, { message: "Password must be more than 6 characters!" }).trim()
});

export type registerType = z.infer<typeof registerSchema>
export type loginType = z.infer<typeof loginSchema>