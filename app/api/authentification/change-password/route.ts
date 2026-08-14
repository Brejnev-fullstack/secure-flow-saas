import { NextRequest } from "next/server";

import * as AuthController from "@/modules/authentification/auth.controller";
import { getUserFromRequest } from "@/libs/auth";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import { getAuditContext } from "@/modules/audit/audit.context";

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();

    const user =
      await getUserFromRequest(request);

    const context =
      getAuditContext(request);

    await AuthController.changePassword(
      user.idUser,
      body,
      context,
    );

    return successResponse(
      null,
      "Mot de passe modifié avec succès",
    );
  } catch (error) {
    return handleError(error);
  }
}