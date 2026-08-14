import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/libs/jwt";

export async function middleware(
  request: NextRequest,
) {
  const token =
    request.cookies.get("access_token")?.value;

  const { pathname } = request.nextUrl;

  const isApiRoute =
    pathname.startsWith("/api");

  /*
   * Aucun token
   */
  if (!token) {
    /*
     * Requête API
     */
    if (isApiRoute) {
      const response = NextResponse.json(
        {
          success: false,
          message: "Non authentifié",
        },
        {
          status: 401,
        },
      );

      return addSecurityHeaders(response);
    }

    /*
     * Navigation classique
     */
    const response =
      NextResponse.redirect(
        new URL(
          "/login",
          request.url,
        ),
      );

    return addSecurityHeaders(response);
  }

  /*
   * Vérification du JWT
   */
  try {
    await verifyToken(token);

    const response =
      NextResponse.next();

    return addSecurityHeaders(response);
  } catch {
    let response: NextResponse;

    /*
     * Requête API
     */
    if (isApiRoute) {
      response = NextResponse.json(
        {
          success: false,
          message:
            "Token invalide ou expiré",
        },
        {
          status: 401,
        },
      );
    } else {
      /*
       * Navigation classique
       */
      response =
        NextResponse.redirect(
          new URL(
            "/login",
            request.url,
          ),
        );
    }

    /*
     * Suppression des cookies invalides
     */
    response.cookies.delete(
      "access_token",
    );

    response.cookies.delete(
      "refresh_token",
    );

    return addSecurityHeaders(
      response,
    );
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/user/:path*",
    "/api/authentification/me",
  ],
};

/**
 * Ajout des Security Headers
 */
function addSecurityHeaders(
  response: NextResponse,
) {
  /*
   * Empêche le navigateur
   * de deviner un autre type MIME
   */
  response.headers.set(
    "X-Content-Type-Options",
    "nosniff",
  );

  /*
   * Empêche le chargement
   * de la page dans une iframe
   */
  response.headers.set(
    "X-Frame-Options",
    "DENY",
  );

  /*
   * Contrôle les informations
   * envoyées dans le Referer
   */
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );

  return response;
}