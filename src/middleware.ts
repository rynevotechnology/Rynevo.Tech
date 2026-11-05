import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

/**
 * Protects:
 *  - /admin/*        → redirect to /admin/login without a valid session
 *  - /api/admin/*    → 401 JSON without a valid session
 * Role-based rule: only ADMIN may reach /api/admin/users (user management).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  // Login page: bounce already-authenticated users to the dashboard
  if (pathname === "/admin/login") {
    if (session) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  if (pathname.startsWith("/api/admin/users") && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden — administrator role required" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*"],
};
