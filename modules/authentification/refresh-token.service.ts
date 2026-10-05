import * as Repository from "./refresh-token.repository";
import { generateRefreshToken, hashRefreshToken } from "@/libs/token";
import { createError } from "@/utils/errors";

export async function create(userId: number) {
    const token = generateRefreshToken();

    await Repository.create({
        tokenHash: hashRefreshToken(token),
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return token;
}
export async function verify(token: string) {
  const tokenHash = hashRefreshToken(token);
  const refreshToken = await Repository.findByHash(tokenHash);

  if (!refreshToken) {
    throw createError("Refresh token invalide", 401);
  }
  
  if (refreshToken.revokedAt) {

  await Repository.revokeAllByUser(
    refreshToken.userId
  );

  throw createError(
    "Session compromise, reconnexion nécessaire",
    401
  );
}

  if (refreshToken.revokedAt) {
    throw createError("Refresh token révoqué", 401);
  }

  if (refreshToken.expiresAt < new Date()) {
    throw createError("Refresh token expiré", 401);
  }

  return refreshToken;
   }
export async function revoke(id: number) {
  await Repository.revoke(id);
}
export async function rotate(refreshToken: Awaited<ReturnType<typeof verify>>) {
  await revoke(refreshToken.id);
  return create(refreshToken.userId);
}
export async function revokeAll(userId: number) {
  await Repository.revokeAllByUser(userId);
}
export async function deleteExpired() {
  await Repository.deleteExpired();
}