import Container from "@/components/Container";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-24">
      <Container className="max-w-2xl text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-widest text-teal-700">
          404 Error
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold text-navy-900 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 font-body text-lg text-navy-700">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/" variant="primary">
            Back Home
          </Button>
          <Button href="/contact" variant="outline">
            Contact Corland Partners
          </Button>
        </div>
      </Container>
    </section>
  );
}
