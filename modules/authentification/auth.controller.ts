import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/modules/authentification/auth.validate";
import * as AuthService from "./auth.service";
import { toUserResponse } from "./auth.mapper";
import { AuditContext } from "@/modules/audit/audit.types";

export async function register(body: unknown, context?: AuditContext) {
  const data = registerSchema.parse(body);
  const user = await AuthService.register(data, context);
  return toUserResponse(user);
}
export async function login(body: unknown,context?: AuditContext) {
  const data = loginSchema.parse(body);
  const result = await AuthService.login(data,context);
  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    user: toUserResponse(result.user),
  };
}
export async function refresh(refreshToken: string,context?: AuditContext) {
  const result = await AuthService.refresh(refreshToken,context);
  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    user: toUserResponse(result.user),
  };
}
export async function logout(refreshToken: string,context?: AuditContext) {
  await AuthService.logout(refreshToken,context);
}
export async function verifyEmail(body: unknown) {
  const data = verifyEmailSchema.parse(body);

  return AuthService.verifyEmail(data.token);
}
export async function changePassword(idUser: number, body: unknown, context?: AuditContext) {
  const data = changePasswordSchema.parse(body);
  return AuthService.changePassword(idUser, data.oldPassword, data.newPassword,context);
}
export async function forgotPassword(body: unknown) {
  const data = forgotPasswordSchema.parse(body);
  return AuthService.forgotPassword(data.email);
}
export async function resetPassword(body: unknown,context?: AuditContext) {
  const data = resetPasswordSchema.parse(body);
  return AuthService.resetPassword(data.token, data.newPassword, context);
}
