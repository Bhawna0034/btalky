import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/", "/profile"];
  const isProtected = protectedRoutes.includes(pathname);

  //   If user is not logged in & tries to access protected route
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   If user is logged in & tries to access login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/", "/profile", "/login"] };
