import * as UserRepository from "./user.repository";
import { UpdateUser, UpdateMe } from "./user.types";
import { createError } from "@/utils/errors";
import { AuditAction } from "@/modules/audit/audit.actions";
import { log as auditLog } from "@/modules/audit/audit.service";
import { AuditContext } from "@/modules/audit/audit.types";
import { Role } from "@/generated/prisma/client";

export async function getUsers() {
  return UserRepository.findAll();
}
export async function getUserById(idUser: number) {
  const user = await UserRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }

  return user;
}

export async function updateUser(
  idUser: number,
  data: UpdateUser,
  actorId: number,
  context?: AuditContext,
) {
  const user = await UserRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }

  const updatedUser = await UserRepository.updateUser(idUser, data);

  if (data.role && data.role !== user.role) {
    await auditLog({
      userId: actorId,
      action: AuditAction.ROLE_CHANGED,
      entity: "User",
      entityId: String(idUser),
      metadata: {
        oldRole: user.role,
        newRole: data.role,
      },
      ...context,
    });
  } else {
    await auditLog({
      userId: actorId,
      action: AuditAction.USER_UPDATED,
      entity: "User",
      entityId: String(idUser),
      metadata: {
        updatedFields: Object.keys(data),
      },
      ...context,
    });
  }

  return updatedUser;
}

export async function deleteUser(
  idUser: number,
  actorId: number,
  context?: AuditContext,
) {
  const user = await UserRepository.findById(idUser);
  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }
  const result = await UserRepository.deleteUser(idUser);
  await auditLog({
    userId: actorId,
    action: AuditAction.USER_DELETED,
    entity: "User",
    entityId: String(idUser),

    metadata: {
      email: user.email,
      role: user.role,
    },
    ...context,
  });

  return result;
}

export async function getMe(idUser: number) {
  const user = await UserRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }

  return user;
}
export async function updateMe(idUser: number, data: UpdateMe) {
  const user = await UserRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }
  return UserRepository.updateUser(idUser, data);
}
