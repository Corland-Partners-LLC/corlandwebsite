import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat, Varela_Round } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/content/company";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const varelaRound = Varela_Round({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corlandpartners.com",
  ),
  title: {
    default: `${company.name} | ${company.tagline}`,
    template: "%s | Corland Partners",
  },
  description: company.heroSubhead,
  // Fallback Open Graph / Twitter image for any route that doesn't call
  // lib/seo.ts's pageMetadata() (e.g. the 404 page) — every route's
  // metadata.images ultimately resolves to this branded default unless a
  // page overrides it. pageMetadata() sets the same image explicitly for
  // every real page.
  openGraph: {
    siteName: company.name,
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: `${company.name} — ${company.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.png"],
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corlandpartners.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description: company.tagline,
  url: siteUrl,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: "US",
  },
  sameAs: [company.facebookUrl],
};

// Plain WebSite schema — no SearchAction, since the site has no search
// feature and we don't want to claim functionality that doesn't exist.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.name,
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${varelaRound.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-white font-body text-navy-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
