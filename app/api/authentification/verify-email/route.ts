import { NextRequest } from "next/server";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await AuthController.verifyEmail(body);

    return successResponse(
      null,
      "Email vérifié avec succès",
    );
  } catch (error) {
    return handleError(error);
  }
}