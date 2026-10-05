import { Role } from "@/generated/prisma/client";

export const ROLE_PERMISSIONS: Record<Role, readonly string[]> = {
  USER: [
    "profile.read",
    "profile.update",
  ],

  MANAGER: [
    "profile.read",
    "profile.update",
    "users.read",
  ],

  ADMIN: [
    "profile.read",
    "profile.update",
    "users.read",
    "users.create",
    "users.update",
    "users.delete",
  ],

  SUPER_ADMIN: ["*"],
};