import { NextRequest } from "next/server";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import { getAuditContext } from "@/modules/audit/audit.context";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const context = getAuditContext(req);
    const user = await AuthController.register(body,context);

    return successResponse(
      {
        user,
      },
      "Utilisateur créé avec succès",
      201,
    );

  } catch (error) {
    return handleError(error);
  }
}