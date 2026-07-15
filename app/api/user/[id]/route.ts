import { NextRequest } from "next/server";
import { getUserFromRequest } from "@/libs/auth";
import { Role } from "@/generated/prisma/client";
import { requireRole } from "@/libs/permissions";
import * as UserController from "@/modules/user/user.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const currentUser = getUserFromRequest(request);
    requireRole(currentUser.role, Role.ADMIN);
    const { id } = await params;
    const idUser = Number(id);
    const result = await UserController.getUserById(idUser);

    return successResponse(result, "Utilisateur récupéré");
  } catch (error) {
    return handleError(error);
  }
}
export async function PUT(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const currentUser = getUserFromRequest(request);
    requireRole(currentUser.role, Role.ADMIN);

    const { id } = await params;
    const idUser = Number(id);
    const body = await request.json();
    const result = await UserController.updateUser(idUser, body);

    return successResponse(result, "Utilisateur mis à jour");
  } catch (error) {
    return handleError(error);
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const currentUser = getUserFromRequest(request);
    requireRole(currentUser.role, Role.ADMIN);

    const { id } = await params;
    const idUser = Number(id);

    const body = await request.json();

    const result = await UserController.updateUser(idUser, body);

    return successResponse(result, "Utilisateur mis à jour");
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const currentUser = getUserFromRequest(request);
    requireRole(currentUser.role, Role.ADMIN);
    const { id } = await params;
    const idUser = Number(id);
    await UserController.deleteUser(idUser);

    return successResponse(null, "Utilisateur supprimé");
  } catch (error) {
    return handleError(error);
  }
}



