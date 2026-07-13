import { createError } from "@/utils/errors";
import { hashPassword } from "@/libs/bcrypt";
import { Register } from "@/modules/authentification/auth.types";
import * as AuthRepository from "./auth.repository";

export async function register(data: Register) {
  const existingEmail = await AuthRepository.FindByEmail(data.email);
  if (existingEmail) {
    throw createError("Cet email existe déjà", 409);
  }
  const existingLogin = await AuthRepository.FindByLogin(data.login);
  if (existingLogin) {
    throw createError("Ce login existe déjà", 409);
  }
  const passwordHash = await hashPassword(data.password);
  const user = await AuthRepository.RegisterUser({
    ...data,
     password: passwordHash,
  });
  
  return user;
}