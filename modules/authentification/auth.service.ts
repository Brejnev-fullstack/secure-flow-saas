import { createError } from "@/utils/errors";
import { hashPassword, comparePassword } from "@/libs/bcrypt";
import { Register, Login } from "@/modules/authentification/auth.types";
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
export async function login(data: Login) {
  const user = await AuthRepository.FindByLogin(data.login);
  if (!user) {
    throw createError("Login ou mot de passe incorrect", 401);
  }
  const valid = await comparePassword(data.password, user.password);
  if (!valid) {
    throw createError("Login ou mot de passe incorrect", 401);
  }
  return {
    user,
  };
}
