import { NextRequest } from "next/server";
import { verifyToken, JwtPayload } from "@/libs/jwt";
import { createError } from "@/utils/errors";

export function getUserFromRequest(request: NextRequest): JwtPayload {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    throw createError("Non authentifié", 401);
  }
  try {
    return verifyToken(token);
  } catch {
    throw createError("Token invalide ou expiré", 401);
  }
}
export function requireRole(user: JwtPayload, role: "USER" | "ADMIN") {
  if (user.role !== role) {
    throw createError("Accès interdit", 403);
  }
}


