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

  const pathParts = pathname.split("/").filter(Boolean); // Split path and remove empty parts
  const slug = pathParts[0]; // Extract the first segment of the path

  // Ignore the root path (homepage)
  if (!slug) {
    return NextResponse.next();
  }

  // Define static pages that should not be rewritten to dynamic pages
  const staticPages = ["login", "signup", "pricing", "dashboard","plans"];

  if (staticPages.includes(slug)) {
    return NextResponse.next();
  }

  try {
    if (slug) {
      // Rewrite to the dynamic page component, e.g., /page/[slug].js
      return NextResponse.rewrite(new URL(`/${slug}`, request.url));
    }
  } catch (error) {
    console.error("API call failed:", slug);
    // Redirect to a 404 page if the API call fails
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  // Proceed to the next middleware or route handler if nothing matches
  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: ["/:path*"],
};
