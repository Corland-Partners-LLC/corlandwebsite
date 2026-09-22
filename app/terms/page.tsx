import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import LegalDocument from "@/components/LegalDocument";
import { termsOfService } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that govern your use of the Corland Partners website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />
      </Container>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <LegalDocument {...termsOfService} />
        </Container>
      </section>
    </>
  );
}
