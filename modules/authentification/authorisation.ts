import { NextRequest } from "next/server";
import { Role } from "@/generated/prisma/client";
import { forbidden } from "@/utils/errors";
import { getCurrentUser } from "./current-user";
import { ROLE_PERMISSIONS } from "./roles";

export class Authorization {
  static async user(request: NextRequest) {
    return getCurrentUser(request);
  }

  static async requireRole(request: NextRequest, roles: Role[]) {
    const user = await this.user(request);
    if (!roles.includes(user.role)) {
      throw forbidden("Rôle insuffisant");
    }

    return user;
  }

  static async requirePermission(request: NextRequest, permission: string) {
    const user = await this.user(request);
    const permissions = ROLE_PERMISSIONS[user.role];

    if (!permissions.includes("*") && !permissions.includes(permission)) {
      throw forbidden("Permission insuffisante");
    }

    return user;
  }

  static async isAdmin(request: NextRequest) {
    const user = await this.user(request);
    return user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN;
  }

  static async canManageRole(request: NextRequest) {
    const user = await this.user(request);
    return user.role === Role.SUPER_ADMIN;
  }

  static async canAccessUser(request: NextRequest, targetUserId: number) {
    const user = await this.user(request);
    // ADMIN et SUPER_ADMIN peuvent accéder à tous les utilisateurs
    if (user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) {
      return true;
    }

    // USER peut seulement accéder à son propre compte
    return user.idUser === targetUserId;
  }
}
