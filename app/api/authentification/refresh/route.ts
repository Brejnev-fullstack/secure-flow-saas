import { NextRequest } from "next/server";
import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import { unauthorized } from "@/utils/errors";
import { getAuditContext } from "@/modules/audit/audit.context";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      throw unauthorized("Refresh token manquant");
    }

    const context = getAuditContext(request);
    const result = await AuthController.refresh(refreshToken,context);
    const response = successResponse(
      {
        user: result.user,
      },
      "Token rafraîchi avec succès",
    );

    response.cookies.set("access_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    response.cookies.set("refresh_token", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
