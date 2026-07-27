import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | Futurious.AI",
  description:
    "Read the Futurious.AI disclaimer regarding AI tool listings, third-party links, accuracy, and professional advice.",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <article className="space-y-10">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Disclaimer
          </h1>

          <p className="mt-6 text-sm text-gray-500">
            Last updated: July 27, 2026
          </p>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            The information published on Futurious.AI is provided for general
            informational and educational purposes only.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            1. General Information
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI is an independent platform that helps users discover,
            compare, and learn about Artificial Intelligence tools, products,
            services, prompts, and related technologies.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            While we aim to provide useful and accurate information, we do not
            guarantee that all content will always be complete, current,
            accurate, reliable, or suitable for every user or purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            2. AI Tool Information
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            AI tools may change their features, pricing, free plans, ownership,
            availability, supported platforms, integrations, policies, and
            technical capabilities without notice.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            Before purchasing, subscribing to, downloading, or relying on any
            AI tool, you should verify the latest information directly from the
            relevant provider&apos;s official website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            3. No Endorsement or Affiliation
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            The inclusion of an AI tool, product, company, logo, trademark, or
            external link on Futurious.AI does not necessarily represent an
            endorsement, recommendation, partnership, sponsorship, or
            affiliation.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            All third-party names, logos, trademarks, and product images remain
            the property of their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            4. External Links
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI may contain links to third-party websites and services.
            We do not control those websites and are not responsible for their
            content, availability, security, privacy practices, pricing,
            subscriptions, billing, or customer support.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            Visiting or using a third-party website is at your own discretion
            and risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            5. No Professional Advice
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Nothing published on Futurious.AI should be considered legal,
            financial, medical, investment, cybersecurity, technical, business,
            or other professional advice.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            You should consult a qualified professional before making decisions
            that may have legal, financial, medical, security, or business
            consequences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            6. AI-Generated Content
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Some content, drafts, summaries, descriptions, or research support
            may be created or assisted using Artificial Intelligence. Such
            content may contain inaccuracies, omissions, or outdated
            information and should be independently verified where important.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            7. Affiliate and Advertising Disclosure
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            Futurious.AI may in the future participate in affiliate programmes,
            display advertisements, publish sponsored content, or receive
            compensation for certain referrals.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            Where applicable, relevant affiliate or sponsored relationships
            will be disclosed. Such compensation will not increase the price
            paid by the user unless otherwise stated by the third-party
            provider.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            8. Results and Performance
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We do not guarantee that any AI tool, prompt, strategy, workflow, or
            recommendation will produce a particular result, income,
            improvement, saving, performance level, or business outcome.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            Results depend on many factors, including the selected tool, user
            input, data quality, technical environment, subscription plan, and
            individual circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            9. Limitation of Responsibility
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            To the maximum extent permitted by applicable law, Futurious.AI and
            its operators will not be responsible for loss, damage, error,
            interruption, expense, or other consequence arising from reliance
            on website content or use of third-party tools and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            10. Changes to This Disclaimer
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            We may update this Disclaimer when the website, services, business
            model, or applicable requirements change. The latest version will
            be published on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">
            11. Contact
          </h2>

          <p className="mt-4 leading-8 text-gray-300">
            For questions, corrections, or concerns regarding this Disclaimer,
            please use our{" "}
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