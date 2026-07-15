import { NextRequest } from "next/server";
import { Role } from "@/generated/prisma/client";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import * as UserController from "@/modules/user/user.controller";
import { getUserFromRequest } from "@/libs/auth";
import { requireRole } from "@/libs/permissions";

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    requireRole(user.role, Role.ADMIN);
    const users = await UserController.getUsersController();
    return successResponse(
      users,
      "Liste des utilisateurs récupérée",
    );
  } catch (error) {
    return handleError(error);
  }
}

