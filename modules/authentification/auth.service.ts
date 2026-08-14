import crypto from "crypto";
import { createError } from "@/utils/errors";
import { Role } from "@/generated/prisma/client";
import { hashPassword, comparePassword } from "@/libs/bcrypt";
import { signToken } from "@/libs/jwt";
import { Register, Login } from "@/modules/authentification/auth.types";
import * as AuthRepository from "./auth.repository";
import * as RefreshTokenService from "./refresh-token.service";
import { sendVerificationEmail, sendResetPasswordEmail } from "@/libs/email";
import { logger } from "@/libs/logger";
import { log as auditLog } from "@/modules/audit/audit.service";
import { AuditAction } from "@/modules/audit/audit.actions";
import { AuditContext } from "@/modules/audit/audit.types";

/**
 * Génère un access token JWT.
 *
 * IMPORTANT :
 * signToken() utilise maintenant jose et retourne
 * une Promise<string>.
 */
async function createAccessToken(user: {
  idUser: number;
  email: string;
  role: Role;
}) {
  return await signToken({
    idUser: user.idUser,
    email: user.email,
    role: user.role,
  });
}

/**
 * Inscription
 */
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

/**
 * Connexion
 */
export async function login(data: Login, context?: AuditContext) {
  const user = await AuthRepository.FindByEmail(data.email);

  /**
   * Utilisateur introuvable
   */
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

  /**
   * Vérification du mot de passe
   */
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

  /**
   * Vérification de l'email
   */
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

  /**
   * Audit login réussi
   */
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

  /**
   * Génération du JWT
   *
   * signToken() est maintenant asynchrone
   */
  const accessToken = await createAccessToken(user);

  /**
   * Création du refresh token
   */
  const refreshToken = await RefreshTokenService.create(user.idUser);

  return {
    accessToken,
    refreshToken,
    user,
  };
}

/**
 * Refresh Token
 */
export async function refresh(refreshToken: string, context?: AuditContext) {
  /**
   * Vérification du refresh token
   */
  const storedToken = await RefreshTokenService.verify(refreshToken);

  /**
   * Audit
   */
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

  /**
   * Nouveau access token
   */
  const accessToken = await createAccessToken(storedToken.user);

  /**
   * Rotation du refresh token
   */
  const newRefreshToken = await RefreshTokenService.rotate(storedToken);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: storedToken.user,
  };
}

/**
 * Déconnexion
 */
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

/**
 * Vérification de l'email
 */
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

/**
 * Changement du mot de passe
 */
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

  /**
   * Vérification de l'ancien mot de passe
   */
  const valid = await comparePassword(oldPassword, user.password);

  if (!valid) {
    throw createError("Ancien mot de passe incorrect", 401);
  }

  /**
   * Hash du nouveau mot de passe
   */
  const passwordHash = await hashPassword(newPassword);

  await AuthRepository.updatePassword(idUser, passwordHash);

  /**
   * Révocation de toutes les sessions
   */
  await RefreshTokenService.revokeAll(idUser);

  /**
   * Audit
   */
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

/**
 * Mot de passe oublié
 */
export async function forgotPassword(email: string) {
  const user = await AuthRepository.FindByEmail(email);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }

  /**
   * Génération du token
   */
  const token = crypto.randomBytes(32).toString("hex");

  /**
   * Expiration : 15 minutes
   */
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await AuthRepository.saveResetToken(user.idUser, token, expires);

  await sendResetPasswordEmail(user.email, token);

  return {
    message: "Email de récupération envoyé",
  };
}

/**
 * Réinitialisation du mot de passe
 */
export async function resetPassword(
  token: string,
  newPassword: string,
  context?: AuditContext,
) {
  const user = await AuthRepository.findByResetToken(token);

  if (!user) {
    throw createError("Token invalide", 400);
  }

  /**
   * Vérification expiration
   */
  if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
    throw createError("Token expiré", 400);
  }

  /**
   * Nouveau hash
   */
  const passwordHash = await hashPassword(newPassword);

  await AuthRepository.updatePassword(user.idUser, passwordHash);

  /**
   * Invalidation des sessions
   */
  await RefreshTokenService.revokeAll(user.idUser);

  /**
   * Audit
   */
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
