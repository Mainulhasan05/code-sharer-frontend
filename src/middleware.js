import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Ignore static assets and Next.js internal files
  if (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images/")
  ) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get("codesharer_token");

  // Define static pages that should not be rewritten
  const staticPages = ["pricing", "favicon.ico", "plans"];

  // Prevent access to login or signup if the user is already authenticated
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Restrict access to dashboard if the user is not authenticated
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to static pages and the homepage
  if (
    !pathname.startsWith("/dashboard") &&
    staticPages.includes(pathname.slice(1))
  ) {
    return NextResponse.next();
  }

  // Rewrite other dynamic paths
  try {
    const pathParts = pathname.split("/").filter(Boolean); // Split path and remove empty parts
    const slug = pathParts[0]; // Extract the first segment of the path

    if (slug) {
      return NextResponse.rewrite(new URL(`/${slug}`, request.url));
    }
  } catch (error) {
    console.error("Error rewriting path:", error);
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: ["/:path*"],
};
