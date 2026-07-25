"use client";

import Link from "next/link";
import {
  useActionState,
  useEffect,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import FormField from "@/components/admin/FormField";
import SwitchField from "@/components/admin/SwitchField";
import TextareaField from "@/components/admin/TextareaField";

export type CategoryFormValues = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  sortOrder: number;
  featured: boolean;
};

export type CategoryFormErrors = Partial<
  Record<keyof CategoryFormValues | "form", string>
>;

export type CategoryFormState = {
  success: boolean;
  message: string;
  errors: CategoryFormErrors;
  values?: Partial<CategoryFormValues>;
};

export type CategoryFormAction = (
  previousState: CategoryFormState,
  formData: FormData,
) => Promise<CategoryFormState>;

type Props = {
  mode: "create" | "edit";
  action: CategoryFormAction;
  initialValues?: Partial<CategoryFormValues>;
};

const EMPTY_STATE: CategoryFormState = {
  success: false,
  message: "",
  errors: {},
};

const DEFAULT_VALUES: CategoryFormValues = {
  name: "",
  slug: "",
  icon: "",
  description: "",
  sortOrder: 0,
  featured: false,
};

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
      className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
    >
      {pending
        ? "Saving..."
        : mode === "create"
        ? "Create Category"
        : "Save Changes"}
    </button>
  );
}

export default function CategoryForm({
  mode,
  action,
  initialValues,
}: Props) {
  const [state, formAction] = useActionState(
    action,
    EMPTY_STATE,
  );

  const values = {
    ...DEFAULT_VALUES,
    ...initialValues,
    ...state.values,
  };

  const [name, setName] = useState(values.name);
  const [slug, setSlug] = useState(values.slug);
  const [manualSlug, setManualSlug] = useState(
    mode === "edit" || Boolean(values.slug),
  );

  useEffect(() => {
    setName(values.name);
    setSlug(values.slug);
  }, [values.name, values.slug]);

  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = e.target.value;

    setName(value);

    if (!manualSlug) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = slugify(e.target.value);

    setSlug(value);
    setManualSlug(Boolean(value));
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.message && (
        <div
          className={`rounded-xl border px-5 py-4 text-sm ${
            state.success
              ? "border-green-900 bg-green-950/30 text-green-300"
              : "border-red-900 bg-red-950/30 text-red-300"
          }`}
        >
          {state.message}
        </div>
      )}

      <section className="rounded-2xl border border-gray-800 bg-[#111827] p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
  <label
    htmlFor="name"
    className="mb-2 block text-sm font-semibold text-gray-200"
  >
    Category Name
    <span className="ml-1 text-red-400">*</span>
  </label>

  <input
    id="name"
    name="name"
    value={name}
    onChange={handleNameChange}
    required
    autoComplete="off"
    className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
  />

  {state.errors.name && (
    <p className="mt-2 text-xs text-red-400">
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
    <span className="ml-1 text-red-400">*</span>
  </label>

  <input
    id="slug"
    name="slug"
    value={slug}
    onChange={handleSlugChange}
    required
    autoComplete="off"
    className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
  />

  {state.errors.slug && (
    <p className="mt-2 text-xs text-red-400">
      {state.errors.slug}
    </p>
  )}
</div>

<FormField
  id="icon"
  name="icon"
  label="Lucide Icon"
  defaultValue={values.icon}
  placeholder="bot"
  helpText="Enter the Lucide icon name, for example bot, code-2, image or video."
  required
  error={state.errors.icon}
/>

          <FormField
            id="sortOrder"
            name="sortOrder"
            type="number"
            label="Sort Order"
            defaultValue={values.sortOrder}
            required
            error={state.errors.sortOrder}
          />
        </div>

        <div className="mt-6">
          <TextareaField
            id="description"
            name="description"
            label="Description"
            defaultValue={values.description}
            rows={5}
            error={state.errors.description}
          />
        </div>

        <div className="mt-6">
          <SwitchField
            id="featured"
            name="featured"
            label="Featured Category"
            description="Show category on homepage"
            defaultChecked={values.featured}
          />
        </div>
      </section>

      <div className="flex justify-between rounded-2xl border border-gray-800 bg-gray-950 p-4">
        <Link
          href="/admin/categories"
          className="rounded-xl border border-gray-700 px-6 py-3 text-sm text-gray-300"
        >
          Cancel
        </Link>

        <SubmitButton mode={mode} />
      </div>
    </form>
  );
}