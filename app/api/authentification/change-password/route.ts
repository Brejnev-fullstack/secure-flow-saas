import { NextRequest } from "next/server";
import { getUserFromRequest } from "@/libs/auth";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";

export async function PATCH(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    const body = await request.json();
    await AuthController.changePassword(user.idUser, body);
    return successResponse(
      null,
      "Mot de passe modifié avec succès",
    );
  } catch (error) {
    return handleError(error);
  }
}