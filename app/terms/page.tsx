import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | Futurious.AI",
  description:
    "Read the Terms and Conditions governing your use of Futurious.AI.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <article className="space-y-10">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Terms and Conditions
          </h1>

          <p className="mt-6 text-sm text-gray-500">
            Last updated: July 27, 2026
          </p>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            These Terms and Conditions govern your access to and use of
            Futurious.AI. By using this website, you agree to these terms.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            1. Acceptance of Terms
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            By accessing or using Futurious.AI, you confirm that you have read,
            understood, and agreed to these Terms and Conditions. If you do not
            agree, you should not use the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            2. Purpose of the Website
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI is an independent platform for discovering, comparing,
            and learning about Artificial Intelligence tools, products,
            services, prompts, and related topics.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            Unless expressly stated otherwise, we do not own, operate, develop,
            or control the third-party AI tools listed on this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            3. Information Accuracy
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We aim to provide useful and accurate information. However, AI
            products frequently change their pricing, features, ownership,
            availability, policies, and technical capabilities.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            We do not guarantee that every listing, description, rating,
            comparison, price, or other detail will always be complete,
            accurate, current, or error-free. You should verify important
            information through the relevant tool&apos;s official website
            before making a decision.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            4. User Accounts
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Certain features may require an account. You are responsible for
            providing accurate account information and maintaining the
            confidentiality of your login credentials.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            You must not use another person&apos;s account, attempt
            unauthorised access, interfere with website security, or use the
            website for fraudulent, unlawful, abusive, or harmful activities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            5. Acceptable Use
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            You agree not to misuse the website, introduce malicious code,
            scrape or extract data in a way that harms the website, bypass
            technical restrictions, impersonate others, or disrupt the
            operation of Futurious.AI.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            6. Third-Party Websites and Services
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI may link to third-party websites, products, payment
            pages, subscription services, and other external resources. These
            services operate under their own terms, policies, pricing, and
            security practices.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            We are not responsible for third-party content, availability,
            purchases, subscriptions, losses, data handling, customer support,
            or any dispute between you and a third-party provider.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            7. Intellectual Property
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            The Futurious.AI name, original website design, text, organisation,
            branding, and other original materials may be protected by
            applicable intellectual property laws.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            Third-party names, logos, product images, trademarks, and other
            materials remain the property of their respective owners. Their
            appearance on Futurious.AI does not imply ownership, endorsement,
            partnership, or affiliation unless expressly stated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            8. User-Submitted Content
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            If you submit feedback, corrections, suggestions, reviews, or other
            content, you confirm that you have the right to provide it and that
            it does not violate any law or third-party right.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            We may review, edit, reject, or remove submitted content at our
            discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            9. No Professional Advice
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Content published on Futurious.AI is provided for general
            informational and educational purposes. It does not constitute
            legal, financial, medical, technical, investment, or other
            professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            10. Disclaimer of Warranties
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI is provided on an &quot;as is&quot; and
            &quot;as available&quot; basis. To the extent permitted by law, we
            make no warranties regarding availability, accuracy, reliability,
            security, suitability, or uninterrupted operation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            11. Limitation of Liability
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            To the maximum extent permitted by law, Futurious.AI and its
            operators will not be liable for indirect, incidental,
            consequential, special, or business losses arising from your use of
            the website or reliance on its content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            12. Suspension or Termination
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We may restrict, suspend, or terminate access to the website or
            specific features where necessary to protect users, maintain
            security, enforce these terms, or comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            13. Changes to These Terms
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We may update these Terms and Conditions from time to time. The
            updated terms will be published on this page with a revised update
            date. Continued use of the website after an update indicates
            acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            14. Governing Law
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            These Terms and Conditions are governed by the applicable laws of
            India. Any dispute will be subject to the jurisdiction of the
            competent courts in India, unless applicable law requires
            otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            15. Contact
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            For questions about these terms, please use our{" "}
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