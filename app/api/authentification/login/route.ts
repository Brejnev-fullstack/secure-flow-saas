import { NextRequest } from "next/server";

import * as AuthController from "@/modules/authentification/auth.controller";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";

import { loginIpLimiter, loginEmailLimiter } from "@/libs/rate-limit/";

import { getAuditContext } from "@/modules/audit/audit.context";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = body.email;

    const ip = request.headers.get("x-forwarded-for") ?? "unknown";

    /*
     * Rate limiting par IP
     */
    const ipCheck = loginIpLimiter(`login-ip-${ip}`);

    if (!ipCheck.success) {
      return Response.json(
        {
          success: false,
          message: "Trop de tentatives depuis cette adresse IP",
          retryAfter: ipCheck.retryAfter,
        },
        {
          status: 429,
        },
      );
    }

    /*
     * Rate limiting par email
     */
    const emailCheck = loginEmailLimiter(`login-email-${email}`);

    if (!emailCheck.success) {
      return Response.json(
        {
          success: false,
          message: "Trop de tentatives pour ce compte",
          retryAfter: emailCheck.retryAfter,
        },
        {
          status: 429,
        },
      );
    }

    /*
     * Audit context
     */
    const context = getAuditContext(request);

    /*
     * Authentification
     */
    const result = await AuthController.login(body, context);

    /*
     * Réponse HTTP
     */
    const response = successResponse(
      {
        user: result.user,
      },
      "Connexion réussie",
    );

    /*
     * Access Token
     */
    response.cookies.set("access_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    /*
     * Refresh Token
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
