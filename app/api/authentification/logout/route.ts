import { NextRequest } from "next/server";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import { getAuditContext } from "@/modules/audit/audit.context";

export async function POST(request: NextRequest) {
  try {
    const context = getAuditContext(request);
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (refreshToken) {
      await AuthController.logout(refreshToken, context);
    }
    const response = successResponse(null, "Déconnexion réussie");
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return response;
  } catch (error) {
    return handleError(error);
  }
}
