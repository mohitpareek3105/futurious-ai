"use client";

import Link from "next/link";
import {
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import FormField from "@/components/admin/FormField";
import SwitchField from "@/components/admin/SwitchField";
import TextareaField from "@/components/admin/TextareaField";

export type ToolFormValues = {
  name: string;
  slug: string;
  company: string;
  website: string;
  logo: string;
  coverImage: string;
  category: string;
  tags: string[];
  description: string;
  pricing: string;
  rating: number;
  founded: string;
  users: string;
  platforms: string[];
  features: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  integrations: string[];
  api: boolean;
  openSource: boolean;
  languages: string[];
  featured: boolean;
};

export type ToolFormFieldErrors = Partial<
  Record<keyof ToolFormValues | "form", string>
>;

export type ToolFormState = {
  success: boolean;
  message: string;
  errors: ToolFormFieldErrors;
  values?: Partial<ToolFormValues>;
};

export type ToolFormAction = (
  previousState: ToolFormState,
  formData: FormData,
) => Promise<ToolFormState>;

type ToolFormProps = {
  mode: "create" | "edit";
  action: ToolFormAction;
  initialValues?: Partial<ToolFormValues>;
};

const EMPTY_STATE: ToolFormState = {
  success: false,
  message: "",
  errors: {},
};

const EMPTY_VALUES: ToolFormValues = {
  name: "",
  slug: "",
  company: "",
  website: "",
  logo: "",
  coverImage: "",
  category: "",
  tags: [],
  description: "",
  pricing: "",
  rating: 0,
  founded: "",
  users: "",
  platforms: [],
  features: [],
  pros: [],
  cons: [],
  useCases: [],
  integrations: [],
  api: false,
  openSource: false,
  languages: [],
  featured: false,
};

function arrayToMultiline(values: string[] | undefined) {
  return values?.join("\n") ?? "";
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function SubmitButton({
  mode,
}: {
  mode: "create" | "edit";
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        "inline-flex min-w-40 items-center justify-center",
        "rounded-xl bg-blue-600 px-6 py-3",
        "text-sm font-semibold text-white transition",
        "hover:bg-blue-700",
        "disabled:cursor-not-allowed disabled:opacity-60",
      ].join(" ")}
    >
      {pending
        ? "Saving..."
        : mode === "create"
          ? "Create AI Tool"
          : "Save Changes"}
    </button>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-gray-800 px-6 py-5">
      <h2 className="text-lg font-bold text-white">
        {title}
      </h2>

      <p className="mt-1 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default function ToolForm({
  mode,
  action,
  initialValues,
}: ToolFormProps) {
  const [state, formAction] = useActionState(
    action,
    EMPTY_STATE,
  );

  const values = useMemo<ToolFormValues>(
    () => ({
      ...EMPTY_VALUES,
      ...initialValues,
      ...state.values,
      tags:
        state.values?.tags ??
        initialValues?.tags ??
        EMPTY_VALUES.tags,
      platforms:
        state.values?.platforms ??
        initialValues?.platforms ??
        EMPTY_VALUES.platforms,
      features:
        state.values?.features ??
        initialValues?.features ??
        EMPTY_VALUES.features,
      pros:
        state.values?.pros ??
        initialValues?.pros ??
        EMPTY_VALUES.pros,
      cons:
        state.values?.cons ??
        initialValues?.cons ??
        EMPTY_VALUES.cons,
      useCases:
        state.values?.useCases ??
        initialValues?.useCases ??
        EMPTY_VALUES.useCases,
      integrations:
        state.values?.integrations ??
        initialValues?.integrations ??
        EMPTY_VALUES.integrations,
      languages:
        state.values?.languages ??
        initialValues?.languages ??
        EMPTY_VALUES.languages,
    }),
    [initialValues, state.values],
  );

  const [name, setName] = useState(values.name);
  const [slug, setSlug] = useState(values.slug);
  const [slugEditedManually, setSlugEditedManually] =
    useState(mode === "edit" || Boolean(values.slug));

  useEffect(() => {
    setName(values.name);
    setSlug(values.slug);
  }, [values.name, values.slug]);

  function handleNameChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const nextName = event.target.value;

    setName(nextName);

    if (!slugEditedManually) {
      setSlug(slugify(nextName));
    }
  }

  function handleSlugChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const nextSlug = slugify(event.target.value);

    setSlug(nextSlug);
    setSlugEditedManually(Boolean(nextSlug));
  }

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      {state.message && (
        <div
          role={state.success ? "status" : "alert"}
          className={[
            "rounded-xl border px-5 py-4 text-sm",
            state.success
              ? "border-green-900 bg-green-950/30 text-green-300"
              : "border-red-900 bg-red-950/30 text-red-300",
          ].join(" ")}
        >
          {state.message}
        </div>
      )}

      {state.errors.form && (
        <div
          role="alert"
          className="rounded-xl border border-red-900 bg-red-950/30 px-5 py-4 text-sm text-red-300"
        >
          {state.errors.form}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        <SectionHeading
          title="Basic information"
          description="Core identity and public listing information for the AI tool."
        />

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Tool name
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <input
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Example: ChatGPT"
              required
              autoComplete="off"
              aria-invalid={Boolean(state.errors.name)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.name
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            {state.errors.name && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Slug
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={handleSlugChange}
              placeholder="chatgpt"
              required
              autoComplete="off"
              aria-invalid={Boolean(state.errors.slug)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.slug
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Public URL: /tools/{slug || "tool-slug"}
            </p>

            {state.errors.slug && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.slug}
              </p>
            )}
          </div>

          <FormField
            id="company"
            name="company"
            label="Company"
            defaultValue={values.company}
            placeholder="Example: OpenAI"
            error={state.errors.company}
            required
          />

          <FormField
            id="category"
            name="category"
            label="Category"
            defaultValue={values.category}
            placeholder="Example: AI Assistant"
            helpText="Use the same spelling as the public category listing."
            error={state.errors.category}
            required
          />

          <FormField
            id="website"
            name="website"
            label="Official website"
            type="url"
            defaultValue={values.website}
            placeholder="https://example.com"
            error={state.errors.website}
            required
          />

          <FormField
            id="pricing"
            name="pricing"
            label="Pricing"
            defaultValue={values.pricing}
            placeholder="Free, Freemium, Paid or Custom"
            error={state.errors.pricing}
            required
          />

          <FormField
            id="founded"
            name="founded"
            label="Founded"
            defaultValue={values.founded}
            placeholder="Example: 2015"
            error={state.errors.founded}
          />

          <FormField
            id="users"
            name="users"
            label="Users"
            defaultValue={values.users}
            placeholder="Example: 200M+"
            helpText="Public-facing user count or adoption figure."
            error={state.errors.users}
          />

          <FormField
            id="rating"
            name="rating"
            label="Rating"
            type="number"
            defaultValue={values.rating}
            min={0}
            max={5}
            step={0.1}
            inputMode="decimal"
            helpText="Enter a value from 0 to 5."
            error={state.errors.rating}
            required
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        <SectionHeading
          title="Media"
          description="Public URLs for the tool logo and cover image. File upload will be added in the next image milestone."
        />

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <FormField
            id="logo"
            name="logo"
            label="Logo URL"
            type="url"
            defaultValue={values.logo}
            placeholder="https://example.com/logo.png"
            helpText="Recommended: square image with a transparent or solid background."
            error={state.errors.logo}
          />

          <FormField
            id="coverImage"
            name="coverImage"
            label="Cover image URL"
            type="url"
            defaultValue={values.coverImage}
            placeholder="https://example.com/cover.jpg"
            helpText="Recommended: landscape image suitable for social sharing."
            error={state.errors.coverImage}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        <SectionHeading
          title="Description"
          description="Primary editorial content displayed on the public tool page."
        />

        <div className="p-6">
          <TextareaField
            id="description"
            name="description"
            label="Full description"
            defaultValue={values.description}
            placeholder="Explain what the tool does, who it is for and its primary value."
            helpText="Write an original, useful description. Avoid copying the official website verbatim."
            error={state.errors.description}
            required
            rows={8}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        <SectionHeading
          title="Capabilities and metadata"
          description="Enter one item per line. Empty lines will be removed automatically."
        />

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <TextareaField
            id="tags"
            name="tags"
            label="Tags"
            defaultValue={arrayToMultiline(values.tags)}
            placeholder={"AI assistant\nProductivity\nWriting"}
            helpText="One tag per line."
            error={state.errors.tags}
            rows={6}
          />

          <TextareaField
            id="platforms"
            name="platforms"
            label="Platforms"
            defaultValue={arrayToMultiline(
              values.platforms,
            )}
            placeholder={"Web\nWindows\nmacOS\niOS\nAndroid"}
            helpText="One supported platform per line."
            error={state.errors.platforms}
            rows={6}
          />

          <TextareaField
            id="features"
            name="features"
            label="Features"
            defaultValue={arrayToMultiline(
              values.features,
            )}
            placeholder={
              "Natural language chat\nDocument analysis\nImage generation"
            }
            helpText="One feature per line."
            error={state.errors.features}
            rows={8}
          />

          <TextareaField
            id="useCases"
            name="useCases"
            label="Use cases"
            defaultValue={arrayToMultiline(
              values.useCases,
            )}
            placeholder={
              "Content creation\nResearch\nCustomer support"
            }
            helpText="One practical use case per line."
            error={state.errors.useCases}
            rows={8}
          />

          <TextareaField
            id="integrations"
            name="integrations"
            label="Integrations"
            defaultValue={arrayToMultiline(
              values.integrations,
            )}
            placeholder={"Slack\nGoogle Drive\nZapier"}
            helpText="One integration per line."
            error={state.errors.integrations}
            rows={6}
          />

          <TextareaField
            id="languages"
            name="languages"
            label="Languages"
            defaultValue={arrayToMultiline(
              values.languages,
            )}
            placeholder={"English\nHindi\nGerman"}
            helpText="One supported language per line."
            error={state.errors.languages}
            rows={6}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        <SectionHeading
          title="Editorial assessment"
          description="Balanced advantages and limitations help users evaluate the tool."
        />

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <TextareaField
            id="pros"
            name="pros"
            label="Pros"
            defaultValue={arrayToMultiline(values.pros)}
            placeholder={
              "Easy to use\nStrong output quality\nUseful free plan"
            }
            helpText="One advantage per line."
            error={state.errors.pros}
            rows={8}
          />

          <TextareaField
            id="cons"
            name="cons"
            label="Cons"
            defaultValue={arrayToMultiline(values.cons)}
            placeholder={
              "Limited free usage\nRequires internet access"
            }
            helpText="One limitation per line."
            error={state.errors.cons}
            rows={8}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        <SectionHeading
          title="Availability settings"
          description="Control technical metadata and homepage visibility."
        />

        <div className="grid gap-4 p-6 md:grid-cols-3">
          <SwitchField
            id="api"
            name="api"
            label="API available"
            description="The company provides an API for developers."
            defaultChecked={values.api}
            error={state.errors.api}
          />

          <SwitchField
            id="openSource"
            name="openSource"
            label="Open source"
            description="The tool or its core implementation is open source."
            defaultChecked={values.openSource}
            error={state.errors.openSource}
          />

          <SwitchField
            id="featured"
            name="featured"
            label="Featured tool"
            description="Display this tool in featured sections of the website."
            defaultChecked={values.featured}
            error={state.errors.featured}
          />
        </div>
      </section>

      <div className="sticky bottom-4 z-10 flex flex-col-reverse gap-3 rounded-2xl border border-gray-800 bg-gray-950/95 p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-gray-500">
          Fields marked with
          <span className="mx-1 text-red-400">*</span>
          are required.
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Link
            href="/admin/tools"
            className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
          >
            Cancel
          </Link>

          <SubmitButton mode={mode} />
        </div>
      </div>
    </form>
  );
}