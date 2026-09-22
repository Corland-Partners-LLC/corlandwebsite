import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import LegalDocument from "@/components/LegalDocument";
import { privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Corland Partners collects, uses, and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      </Container>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <LegalDocument {...privacyPolicy} />
        </Container>
      </section>
    </>
  );
}
