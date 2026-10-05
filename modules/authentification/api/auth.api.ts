import { api } from "@/libs/api";

import type {
  AuthUser,
  CurrentUserResponse,
  ForgotPasswordInput,
  ForgotPasswordResponse,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  ResetPasswordInput,
  ResetPasswordResponse,
  VerifyEmailInput,
  VerifyEmailResponse,
} from "../types/auth.types";

/**
 * Inscription
 *
 * POST /api/auth/register
 */
export async function register(data: RegisterInput): Promise<RegisterResponse> {
  return api<RegisterResponse>("/api/authentification/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Connexion
 */
export async function login(data: LoginInput): Promise<LoginResponse> {
  return api<LoginResponse>("/api/authentification/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Vérification de l'email
 */
export async function verifyEmail(
  data: VerifyEmailInput,
): Promise<VerifyEmailResponse> {
  return api<VerifyEmailResponse>("/api/authentification/verify-email", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Demande de réinitialisation
 * du mot de passe.
 */
export async function forgotPassword(
  data: ForgotPasswordInput,
): Promise<ForgotPasswordResponse> {
  return api<ForgotPasswordResponse>("/api/authentification/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Réinitialisation du mot de passe.
 */
export async function resetPassword(
  data: ResetPasswordInput,
): Promise<ResetPasswordResponse> {
  return api<ResetPasswordResponse>("/api/authentification/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Déconnexion.
 */
export async function logout(): Promise<void> {
  await api<void>("/api/authentification/logout", {
    method: "POST",
  });
}

/**
 * Récupérer l'utilisateur actuellement connecté.
 *
 * GET /api/authentification/me
 */
/*export async function getCurrentUser(): Promise<AuthUser> {
  return api<AuthUser>("/api/authentification/me", {
    method: "GET",
  });
}*/

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await api<{
    success: boolean;
    message: string;
    data: {
      user: AuthUser;
    };
  }>("/api/authentification/me", {
    method: "GET",
  });

  return response.data.user;
}
