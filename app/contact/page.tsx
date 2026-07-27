import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Futurious.AI",
  description:
    "Contact Futurious.AI for feedback, business enquiries, corrections, tool submissions, and general support.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="space-y-12">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            Contact
          </p>

          <h1 className="mt-4 text-5xl font-bold text-white">
            Get in touch
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            Have a question, correction, tool suggestion, partnership enquiry,
            or feedback about Futurious.AI? We would be glad to hear from you.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6">
            <h2 className="text-xl font-semibold text-white">
              General enquiries
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              For feedback, support, corrections, or general questions.
            </p>

            <a
              href="mailto:contact@futuriousai.com"
              className="mt-5 inline-block font-medium text-blue-400 hover:text-blue-300"
            >
              urbankartindia.official@gmail.com
            </a>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6">
            <h2 className="text-xl font-semibold text-white">
              Tool submissions
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              Submit an AI tool for review or request an update to an existing
              listing.
            </p>

            <a
              href="mailto:contact@futuriousai.com?subject=AI%20Tool%20Submission"
              className="mt-5 inline-block font-medium text-blue-400 hover:text-blue-300"
            >
              Submit an AI tool
            </a>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6">
            <h2 className="text-xl font-semibold text-white">
              Business and partnerships
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              For partnerships, sponsorships, advertising, or other business
              enquiries.
            </p>

            <a
              href="mailto:contact@futuriousai.com?subject=Business%20Enquiry"
              className="mt-5 inline-block font-medium text-blue-400 hover:text-blue-300"
            >
              Send a business enquiry
            </a>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6">
            <h2 className="text-xl font-semibold text-white">
              Response time
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              We aim to respond to genuine enquiries within three to five
              business days.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Before contacting us
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            Futurious.AI does not own or operate the third-party AI tools listed
            on this website. For billing, account, subscription, or technical
            issues related to a particular tool, please contact that tool&apos;s
            official support team directly.
          </p>
        </section>
      </div>
    </main>
  );
}