import { Role } from "@/generated/prisma/client";
import { createError } from "@/utils/errors";

export function requireRole(userRole: Role, allowedRole: Role) {
  if (userRole !== allowedRole) {
    throw createError("Accès interdit", 403);
  }
}