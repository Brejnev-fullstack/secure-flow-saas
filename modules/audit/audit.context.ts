import { NextRequest } from "next/server";

export function getAuditContext(request: NextRequest) {
  return {
    ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    requestMethod: request.method,
    requestPath: request.nextUrl.pathname,
  };
}
