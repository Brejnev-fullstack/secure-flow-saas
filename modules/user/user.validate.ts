import { z } from "zod";

export const createUserSchema = z.object({
  nomUser: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  tel: z.string().optional(),
  email: z.email("Email invalide"),
  login: z.string().min(3, "Le login doit contenir au moins 3 caractères"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const updateMeSchema = z.object({
  nomUser: z.string().min(2).optional(),
  prenom: z.string().min(2).optional(),
  tel: z.string().nullable().optional(),
});

export const updateUserSchema = createUserSchema.partial();
