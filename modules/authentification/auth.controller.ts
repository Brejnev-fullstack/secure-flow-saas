import { registerSchema } from "@/modules/authentification/auth.validate";
import * as AuthService from "./auth.service";
import { toUserResponse } from "./auth.mapper";

export async function register(body: unknown) {
  const data = registerSchema.parse(body);
  const user = await AuthService.register(data);
  return toUserResponse(user);
}

