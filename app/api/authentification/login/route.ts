import { NextRequest } from "next/server";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await AuthController.login(body);
    const response = successResponse(
      {
        user: result.user,
      },
      "Connexion réussie",
    );

    return response;
  } catch (error) {
    return handleError(error);
  }
}
