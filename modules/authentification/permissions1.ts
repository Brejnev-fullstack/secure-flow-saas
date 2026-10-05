import { NextRequest } from "next/server";
import { Role } from "@/generated/prisma/client";
import { forbidden } from "@/utils/errors";
import { getCurrentUser } from "./current-user";
import { ROLE_PERMISSIONS } from "./roles";

export async function requireRole(
  request: NextRequest,
  roles: Role[],
) {
  const user = await getCurrentUser(request);
  if (!roles.includes(user.role)) {
    throw forbidden("Accès interdit");
  }
  return user;
}

export async function requirePermission(
  request: NextRequest,
  permission: string,
) {
  const user = await getCurrentUser(request);
  if (user.role === "SUPER_ADMIN") {
    return user;
  }

  const permissions = ROLE_PERMISSIONS[user.role];
  if (!permissions.includes(permission)) {
    throw forbidden("Permission insuffisante");
  }

  return user;
}