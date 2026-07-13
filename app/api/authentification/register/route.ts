import { NextRequest } from "next/server";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await AuthController.register(body);
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
