import { NextRequest } from "next/server";
import { getUserFromRequest } from "@/libs/auth";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import { getAuditContext } from "@/modules/audit/audit.context";

export async function PATCH(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    const body = await request.json();
    const context = getAuditContext(request);
    await AuthController.changePassword(user.idUser, body,context);
    return successResponse(
      null,
      "Mot de passe modifié avec succès",
    );
  } catch (error) {
    return handleError(error);
  }
}