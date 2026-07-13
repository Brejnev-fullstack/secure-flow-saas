import crypto from "crypto";
import { createError } from "@/utils/errors";
import { Role } from "@/generated/prisma/client";
import { hashPassword, comparePassword } from "@/libs/bcrypt";
import { Register, Login } from "@/modules/authentification/auth.types";
import { signToken } from "@/libs/jwt";
import * as AuthRepository from "./auth.repository";
import * as RefreshTokenService from "./refresh-token.service";
import { sendVerificationEmail, sendResetPasswordEmail } from "@/libs/email";

function createAccessToken(user: {
  idUser: number;
  email: string;
  role: Role;
}) {
  return signToken({
    idUser: user.idUser,
    email: user.email,
    role: user.role,
  });
}
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
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await AuthRepository.RegisterUser({
    ...data,
    password: passwordHash,
    verificationToken,
  });
  await sendVerificationEmail(user.email, verificationToken);
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
  if (!user.emailVerified) {
    throw createError(
      "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
      403,
    );
  }

  const accessToken = createAccessToken(user);
  const refreshToken = await RefreshTokenService.create(user.idUser);
  return {
    accessToken,
    refreshToken,
    user,
  };
}
export async function refresh(refreshToken: string) {
  const storedToken = await RefreshTokenService.verify(refreshToken);
  const accessToken = createAccessToken(storedToken.user);
  const newRefreshToken = await RefreshTokenService.rotate(storedToken);
  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: storedToken.user,
  };
}
export async function logout(refreshToken: string) {
  const storedToken = await RefreshTokenService.verify(refreshToken);
  await RefreshTokenService.revoke(storedToken.id);
}
export async function verifyEmail(token: string) {
  const user = await AuthRepository.findByVerificationToken(token);

  if (!user) {
    throw createError("Token invalide", 400);
  }

  await AuthRepository.verifyEmail(user.idUser);

  return {
    message: "Email vérifié avec succès",
  };
}
export async function changePassword(
  idUser: number,
  oldPassword: string,
  newPassword: string,
) {
  const user = await AuthRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }
  const valid = await comparePassword(oldPassword, user.password);
  if (!valid) {
    throw createError("Ancien mot de passe incorrect", 401);
  }
  const passwordHash = await hashPassword(newPassword);
  await AuthRepository.updatePassword(idUser, passwordHash);
  await RefreshTokenService.revokeAll(idUser);
  return {
    message: "Mot de passe modifié avec succès",
  };
}
export async function forgotPassword(email: string) {
  const user = await AuthRepository.FindByEmail(email);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await AuthRepository.saveResetToken(user.idUser, token, expires);
  await sendResetPasswordEmail(user.email, token);

  return {
    message: "Email de récupération envoyé",
  };
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await AuthRepository.findByResetToken(token);

  if (!user) {
    throw createError("Token invalide", 400);
  }

  if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
    throw createError("Token expiré", 400);
  }

  const passwordHash = await hashPassword(newPassword);
  await AuthRepository.updatePassword(user.idUser, passwordHash);
  await RefreshTokenService.revokeAll(user.idUser);

  return {
    message: "Mot de passe réinitialisé avec succès",
  };
}
