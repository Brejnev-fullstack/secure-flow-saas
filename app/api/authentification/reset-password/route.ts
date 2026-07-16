import { NextRequest } from "next/server";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import { getAuditContext } from "@/modules/audit/audit.context";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const context = getAuditContext(request);
    await AuthController.resetPassword(body,  context);
    return successResponse(null, "Mot de passe réinitialisé avec succès");
  } catch (error) {
    return handleError(error);
  }
}
