import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const tokenExpiry = req.cookies.get("token_expiry");
  const url = req.nextUrl.clone();

  const currentTime = Date.now();

  if (url.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    (!token || !tokenExpiry || currentTime > parseInt(tokenExpiry.value)) &&
    url.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
