import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");
  const providerError =
    requestUrl.searchParams.get("error_description") ??
    requestUrl.searchParams.get("error");

  if (providerError) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(providerError)}`,
        requestUrl.origin
      )
    );
  }

  if (code) {
    const supabase = await createClient();

    const { error } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(
        new URL("/", requestUrl.origin)
      );
    }
  }

  /*
   * Supabase may already have confirmed the email even when the
   * session exchange cannot complete, for example when the email
   * link opens in a different browser context.
   */
  return NextResponse.redirect(
    new URL(
      "/login?message=Email confirmed. Please log in to continue.",
      requestUrl.origin
    )
  );
}