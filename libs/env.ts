import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET doit contenir au moins 32 caractères"),

  RESEND_API_KEY: z.string().min(1),

  NEXT_PUBLIC_APP_URL: z.string().url(),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const env = envSchema.parse(process.env);
