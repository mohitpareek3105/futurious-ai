"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function getSafeRedirectPath(value: FormDataEntryValue | null) {
  const path = String(value ?? "").trim();

  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("://")
  ) {
    return "/";
  }

  return path;
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");
  const redirectTo = getSafeRedirectPath(
    formData.get("next")
  );

  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Email and password are required"
      )}&next=${encodeURIComponent(redirectTo)}`
    );
  }

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(
        error.message
      )}&next=${encodeURIComponent(redirectTo)}`
    );
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(
      "/signup?error=Email and password are required"
    );
  }

  if (password.length < 6) {
    redirect(
      "/signup?error=Password must be at least 6 characters"
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/confirm`,
    },
  });

  if (error) {
    redirect(
      `/signup?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/", "layout");

  redirect(
    "/login?message=Check your email and click the confirmation link"
  );
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/", "layout");
  redirect("/");
}