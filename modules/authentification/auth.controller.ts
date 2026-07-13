import {
  registerSchema,
  loginSchema,
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
    user: toUserResponse(result.user),
  };
}
