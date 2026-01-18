import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const role = req.auth?.user?.role;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isAdminRoute = nextUrl.pathname.startsWith("/admin");
    const isApiAdminRoute = nextUrl.pathname.startsWith("/api/admin");
    const isLoginPage = nextUrl.pathname === "/login";

    // 1. Allow all auth API routes
    if (isApiAuthRoute) return NextResponse.next();

    // 2. Handle Admin Protection
    if (isAdminRoute || isApiAdminRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }

        if (role !== "admin") {
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    }

    // 3. Redirect to admin if already logged in and hitting login page
    if (isLoginPage && isLoggedIn && role === "admin") {
        return NextResponse.redirect(new URL("/admin", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*", "/login"],
};
