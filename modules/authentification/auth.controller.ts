import {
  registerSchema,
  loginSchema,
  verifyEmailSchema
} from "@/modules/authentification/auth.validate";
import * as AuthService from "./auth.service";
import { toUserResponse } from "./auth.mapper";

export async function register(body: unknown) {
  const data = registerSchema.parse(body);
  const user = await AuthService.register(data);
  return toUserResponse(user);
}

export async function login(body: unknown) {
  const data = loginSchema.parse(body);
  const result = await AuthService.login(data);
  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    user: toUserResponse(result.user),
  };
}
export async function refresh(refreshToken: string) {
  const result = await AuthService.refresh(refreshToken);
  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    user: toUserResponse(result.user),
  };
}
export async function logout(refreshToken: string) {
  await AuthService.logout(refreshToken);
}
export async function verifyEmail(body: unknown) {
  const data = verifyEmailSchema.parse(body);

  return AuthService.verifyEmail(data.token);
}

