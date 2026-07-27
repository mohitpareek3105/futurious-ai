import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Futurious.AI",
  description:
    "Read the Futurious.AI Privacy Policy to understand how information is collected, used, and protected.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <article className="space-y-10">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-6 text-sm text-gray-500">
            Last updated: July 27, 2026
          </p>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            This Privacy Policy explains how Futurious.AI collects, uses, and
            protects information when you access or use our website and
            services.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            1. Information We May Collect
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We may collect information that you voluntarily provide, including
            your name, email address, account details, feedback, enquiries, and
            other information submitted through our website.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            We may also collect technical information automatically, such as
            your IP address, browser type, device information, operating
            system, referring pages, pages visited, and approximate usage data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            2. How We Use Information
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We may use collected information to operate and improve the
            website, maintain user accounts, respond to enquiries, prevent
            fraud or abuse, analyse website performance, and comply with legal
            obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            3. Authentication and Service Providers
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI may use third-party service providers, including
            hosting, database, authentication, analytics, and security
            providers. These providers may process limited information as
            required to deliver their services.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            User authentication and database services may be provided through
            Supabase. Your information may therefore be processed according to
            the applicable service provider&apos;s privacy and security
            practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            4. Cookies and Analytics
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We may use cookies or similar technologies to maintain sessions,
            remember preferences, improve functionality, understand website
            usage, and measure performance.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            If analytics or advertising services are introduced, this policy
            may be updated to describe the relevant data collection and user
            choices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            5. Third-Party Links
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI contains links to third-party AI tools, products, and
            websites. We do not control their privacy practices and are not
            responsible for their content, security, or data handling. You
            should review the privacy policy of each third-party service before
            providing personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            6. Data Security
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We take reasonable administrative and technical measures to protect
            information. However, no website, network, storage system, or
            internet transmission can be guaranteed to be completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            7. Data Retention
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We may retain information for as long as reasonably necessary to
            operate the website, provide services, resolve disputes, enforce
            agreements, and comply with legal requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            8. Your Choices and Rights
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Depending on your location and applicable law, you may have rights
            relating to access, correction, deletion, restriction, or objection
            to certain processing of your personal information.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            Requests may be submitted through our{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            9. Children&apos;s Privacy
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI is not intended to knowingly collect personal
            information from children below the age required to consent to data
            processing under applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            10. Changes to This Policy
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We may update this Privacy Policy from time to time. The revised
            version will be published on this page with an updated revision
            date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            11. Contact
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            For privacy-related questions, please use our{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Contact page
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}