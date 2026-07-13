import { NextRequest } from "next/server";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await AuthController.resetPassword(body);
    return successResponse(null, "Mot de passe réinitialisé avec succès");
  } catch (error) {
    return handleError(error);
  }
}
