import { NextRequest } from "next/server";
import { Authorization } from "@/modules/authentification/authorisation";
import * as UserController from "@/modules/user/user.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import { forbidden } from "@/utils/errors";
import { getAuditContext } from "@/modules/audit/audit.context";
import { getCurrentUser } from "@/modules/authentification/current-user";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await Authorization.requirePermission(request, "users.read");

    const { id } = await params;
    const idUser = Number(id);

    if (Number.isNaN(idUser)) {
      throw forbidden("Identifiant utilisateur invalide");
    }

    const result = await UserController.getUserById(idUser);

    return successResponse(result, "Utilisateur récupéré");
  } catch (error) {
    return handleError(error);
  }
}
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    await Authorization.requirePermission(request, "users.update");
    const currentUser = await getCurrentUser(request);
    const context = getAuditContext(request);
    const { id } = await params;
    const idUser = Number(id);

    if (Number.isNaN(idUser)) {
      throw forbidden("Identifiant utilisateur invalide");
    }
    const canAccess = await Authorization.canAccessUser(request, idUser);
    if (!canAccess) {
      throw forbidden("Vous ne pouvez pas modifier cet utilisateur");
    }

    const body = await request.json();

    if (body.role) {
      const canManageRole = await Authorization.canManageRole(request);
      if (!canManageRole) {
        throw forbidden("Vous ne pouvez pas modifier les rôles");
      }
    }

    const result = await UserController.updateUser(
      idUser,
      body,
      currentUser.idUser,
      context,
    );

    return successResponse(result, "Utilisateur mis à jour");
  } catch (error) {
    return handleError(error);
  }
}
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    await Authorization.requirePermission(request, "users.update");
    const currentUser = await getCurrentUser(request);
    const context = getAuditContext(request);
    const { id } = await params;
    const idUser = Number(id);

    if (Number.isNaN(idUser)) {
      throw forbidden("Identifiant utilisateur invalide");
    }

    const canAccess = await Authorization.canAccessUser(request, idUser);

    if (!canAccess) {
      throw forbidden("Vous ne pouvez pas modifier cet utilisateur");
    }

    const body = await request.json();

    if (body.role) {
      const canManageRole = await Authorization.canManageRole(request);

      if (!canManageRole) {
        throw forbidden("Vous ne pouvez pas modifier les rôles");
      }
    }

    const result = await UserController.updateUser(
      idUser,
      body,
      currentUser.idUser,
      context,
    );

    return successResponse(result, "Utilisateur mis à jour");
  } catch (error) {
    return handleError(error);
  }
}
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    await Authorization.requirePermission(request, "users.delete");
    const currentUser = await getCurrentUser(request);
    const context = getAuditContext(request);
    const { id } = await params;
    const idUser = Number(id);

    if (Number.isNaN(idUser)) {
      throw forbidden("Identifiant utilisateur invalide");
    }

    await UserController.deleteUser(idUser, currentUser.idUser, context);
    return successResponse(null, "Utilisateur supprimé");
  } catch (error) {
    return handleError(error);
  }
}
