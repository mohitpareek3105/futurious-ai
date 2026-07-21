import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: siteConfig.url,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: {
        "@id": organizationId,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/tools?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const serializedStructuredData = JSON.stringify(structuredData).replace(
  /</g,
  "\\u003c"
);

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  applicationName: siteConfig.name,

  title: {
    default: `${siteConfig.name} — Discover the Best AI Tools`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [...siteConfig.keywords],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Discover the Best AI Tools`,
    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Discover the Best AI Tools`,
    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializedStructuredData,
          }}
        />

        <Navbar userEmail={user?.email ?? null} />

        <main>{children}</main>
      </body>
    </html>
  );
}