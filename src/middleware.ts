import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

// define auth routes where redirect if user not found
const authRoutes = ["/login", "/register"];

// define routes which can access by user and admin like admin/any-route/etc
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    // if want to go auth routes login register then do not do anything
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    // if user not found then do not grant user to go his desire routes
    else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  // check user role is inside roleBasedPrivateRoutes
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    // [/^\/user/]  [/^\/admin/]
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    // check if found routes means admin/anything/etc matched or not
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
};

// private routes
export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};
