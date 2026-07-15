import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/libs/jwt";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isApiRoute = pathname.startsWith("/api");
  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    let response: NextResponse;
    if (isApiRoute) {
      response = NextResponse.json(
        { message: "Token invalide ou expiré" },
        { status: 401 },
      );
    } else {
      response = NextResponse.redirect(new URL("/login", request.url));
    }
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/api/users/:path*",
    "/api/auth/me",
  ],
};
