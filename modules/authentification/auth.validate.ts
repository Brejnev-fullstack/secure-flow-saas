import { z } from "zod";

export const registerSchema = z.object({
  nomUser: z.string().min(2, "Le nom est obligatoire"),
  prenom: z.string().min(2, "Le prénom est obligatoire"),
  tel: z.string().optional(),
  email: z.string().email("Email invalide"),
  login: z.string().min(3, "Login trop court"),
  password: z.string().min(8, "Mot de passe minimum 8 caractères"),
});
