import crypto from "crypto";
import { createError } from "@/utils/errors";
import { Role } from "@/generated/prisma/client";
import { hashPassword, comparePassword } from "@/libs/bcrypt";
import { Register, Login } from "@/modules/authentification/auth.types";
import { signToken } from "@/libs/jwt";
import * as AuthRepository from "./auth.repository";
import * as RefreshTokenService from "./refresh-token.service";
import { sendVerificationEmail, sendResetPasswordEmail } from "@/libs/email";
import { logger } from "@/libs/logger";
import { log as auditLog } from "@/modules/audit/audit.service";
import { AuditAction } from "@/modules/audit/audit.actions";
import { AuditContext } from "@/modules/audit/audit.types";

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
export async function register(data: Register, context?: AuditContext) {
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

  await auditLog({
    userId: user.idUser,
    action: AuditAction.USER_REGISTERED,
    entity: "User",
    entityId: String(user.idUser),
    metadata: {
      email: user.email,
    },
    ...context,
  });

  logger.info("USER REGISTERED", {
    userId: user.idUser,
    email: user.email,
  });

  await sendVerificationEmail(user.email, verificationToken);
  return user;
}
export async function login(data: Login, context?: AuditContext) {
  const user = await AuthRepository.FindByEmail(data.email);
  if (!user) {
    logger.warn("LOGIN FAILED - USER INTROUVABLE", {
      email: data.email,
    });

    await auditLog({
      action: AuditAction.USER_LOGIN_FAILED,
      entity: "User",
      metadata: {
        email: data.email,
        reason: "USER_NOT_FOUND",
      },
      status: "FAILED",
      ...context,
    });

    throw createError("Login ou mot de passe incorrect", 401);
  }
  const valid = await comparePassword(data.password, user.password);
  if (!valid) {
    logger.warn("LOGIN FAILED - INVALID PASSWORD", {
      email: data.email,
    });

    await auditLog({
      action: AuditAction.USER_LOGIN_FAILED,
      entity: "User",
      metadata: {
        email: data.email,
        reason: "INVALID_PASSWORD",
      },
      status: "FAILED",
      ...context,
    });

    throw createError("Login ou mot de passe incorrect", 401);
  }
  if (!user.emailVerified) {
    throw createError(
      "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
      403,
    );
  }

  logger.info("LOGIN SUCCESS", {
    userId: user.idUser,
    email: user.email,
  });

  await auditLog({
    userId: user.idUser,
    action: AuditAction.USER_LOGIN,
    entity: "User",
    entityId: String(user.idUser),
    metadata: {
      email: user.email,
    },
    ...context,
  });

  const accessToken = createAccessToken(user);
  const refreshToken = await RefreshTokenService.create(user.idUser);
  return {
    accessToken,
    refreshToken,
    user,
  };
}
export async function refresh(refreshToken: string, context?: AuditContext) {
  const storedToken = await RefreshTokenService.verify(refreshToken);

  await auditLog({
    userId: storedToken.user.idUser,
    action: AuditAction.TOKEN_REFRESHED,
    entity: "RefreshToken",
    metadata: {
      tokenId: storedToken.id,
    },
    ...context,
  });

  logger.info("TOKEN REFRESHED", {
    userId: storedToken.user.idUser,
  });

  const accessToken = createAccessToken(storedToken.user);
  const newRefreshToken = await RefreshTokenService.rotate(storedToken);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: storedToken.user,
  };
}
export async function logout(refreshToken: string, context?: AuditContext) {
  const storedToken = await RefreshTokenService.verify(refreshToken);
  await RefreshTokenService.revoke(storedToken.id);

  await auditLog({
    userId: storedToken.user.idUser,
    action: AuditAction.USER_LOGOUT,
    entity: "RefreshToken",
    entityId: String(storedToken.id),
    metadata: {
      refreshTokenId: storedToken.id,
    },
    ...context,
  });
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
  context?: AuditContext,
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
  await auditLog({
    userId: idUser,
    action: AuditAction.PASSWORD_CHANGED,
    entity: "User",
    entityId: String(idUser),
    ...context,
  });
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

export async function resetPassword(
  token: string,
  newPassword: string,
  context?: AuditContext,
) {
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

  await auditLog({
    userId: user.idUser,
    action: AuditAction.PASSWORD_RESET_REQUESTED,
    entity: "User",
    entityId: String(user.idUser),
    ...context,
  });

  return {
    message: "Mot de passe réinitialisé avec succès",
  };
}
