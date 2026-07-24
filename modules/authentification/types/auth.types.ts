export type UserRole = "USER" | "MANAGER" | "ADMIN" | "SUPER_ADMIN";

export type RegisterInput = {
  nomUser: string;
  prenom: string;
  tel?: string;
  email: string;
  login: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthUser = {
  idUser: number;
  nomUser: string;
  prenom: string;
  tel: string | null;
  email: string;
  login: string;
  role: UserRole;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Réponse métier retournée par le controller.
 *
 * AuthController.register()
 * retourne toUserResponse(user)
 */
export type RegisterControllerResponse = AuthUser;

/**
 * Structure enveloppée par la route HTTP.
 *
 * successResponse(
 *   { user },
 *   "Utilisateur créé avec succès",
 *   201
 * )
 */
export type RegisterResponse = {
  user: RegisterControllerResponse;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type VerifyEmailInput = {
  token: string;
};

export type VerifyEmailResponse = {
  message: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type ResetPasswordInput = {
  token: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
};
