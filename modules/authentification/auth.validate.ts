import { z } from "zod";

export const registerSchema = z.object({
  nomUser: z.string().min(2, "Le nom est obligatoire"),
  prenom: z.string().min(2, "Le prénom est obligatoire"),
  tel: z.string().optional(),
  email: z.string().email("Email invalide"),
  login: z.string().min(3, "Login trop court"),
  password: z.string().min(8, "Mot de passe minimum 8 caractères"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse email invalide"),
  password: z.string().min(1, "Mot de passe obligatoire"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
});

export const verifyEmailSchema = z.object({
  token: z.string(),
});
