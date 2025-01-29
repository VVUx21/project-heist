import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    '/sign-in',
    '/register/:path*', 
    '/login' 
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const url = request.nextUrl;

  //console.log("Token:", token);

  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/login"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !token &&
    (url.pathname.startsWith("/register") || url.pathname.startsWith("/events"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
