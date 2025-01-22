import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const [subdomain, ...rest] = host.split(".");
  const hasSubdomain = rest.length >= 2;

  // check if this came in on a subdomain
  if (hasSubdomain) {
    console.log({ subdomain, nextUrl: req.nextUrl });

    // specifically redirect the "shouldredirect" subdomain as a demonstration
    if (req.nextUrl.pathname.startsWith("/shouldredirect")) {
      // explicitly redirect to the login page with a fully defined URL

      const rootLoginPage = new URL("http://example.test:3000/login");

      console.log(
        `redirecting to root login page - ${rootLoginPage.toString()}`
      );

      return NextResponse.redirect(rootLoginPage); // <-- actually redirects to http://foo.example.test:3000/login
    }

    // otherwise, rewrite the subdomain to the /[domain] dynamic route
    return NextResponse.rewrite(
      new URL(`/${subdomain}${req.nextUrl.pathname}`, req.url)
    );
  }

  // handle all other requests
  return NextResponse.next();
}
