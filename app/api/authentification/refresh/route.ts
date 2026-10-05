import { NextRequest, NextResponse } from "next/server";

import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";
import { getAuditContext } from "@/modules/audit/audit.context";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refresh_token")?.value;

    /*
     * Aucun Refresh Token
     */
    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Refresh token manquant",
        },
        {
          status: 401,
        },
      );
    }

    /*
     * Contexte Audit
     */
    const context = getAuditContext(request);

    /*
     * Rotation du Refresh Token
     */
    const result = await AuthController.refresh(refreshToken, context);

    /*
     * Réponse
     */
    const response = successResponse(
      {
        user: result.user,
      },
      "Token renouvelé avec succès",
    );

    /*
     * Nouveau Access Token
     */
    response.cookies.set("access_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    /*
     * Nouveau Refresh Token
     *
     * Rotation du Refresh Token
     */
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
