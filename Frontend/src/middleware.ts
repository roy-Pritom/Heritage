import jwtDecode from "jwt-decode"; // Correct import for jwt-decode
import { NextRequest, NextResponse } from "next/server";
import { TUser } from "./types";

const protectedRoutes = ['/create-property']; // Only add routes that need protection here

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('token')?.value;

    // Check if the path is a public/auth route
    const isAuthRoute = ['/login', '/register'].includes(pathname);

    // If no access token and trying to access a protected route, redirect to login
    if (!accessToken && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If user is logged in and tries to access an auth route, redirect to home or dashboard
    if (accessToken && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    

    // Allow the request to continue if no conditions matched
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
