import { NextRequest } from "next/server";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import * as UserController from "@/modules/user/user.controller";
import { Authorization } from "@/modules/authentification/authorisation";
import { Role } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  try {
    await Authorization.requireRole(request, [Role.ADMIN, Role.SUPER_ADMIN]);
    const users = await UserController.getUsersController();

    return successResponse(users, "Liste des utilisateurs récupérée");
  } catch (error) {
    return handleError(error);
  }
}
