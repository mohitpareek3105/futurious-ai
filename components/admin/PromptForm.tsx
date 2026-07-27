"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ChangeEvent } from "react";

import type { PromptDifficulty } from "@/types/prompt";

export type PromptFormValues = {
  title: string;
  slug: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  difficulty: PromptDifficulty;
  aiModels: string[];
  variables: string[];
  exampleInput: string;
  exampleOutput: string;
  tips: string[];
  featured: boolean;
  published: boolean;
};

export type PromptFormFieldErrors = Partial<
  Record<keyof PromptFormValues | "form", string>
>;

export type PromptFormState = {
  success: boolean;
  message: string;
  errors: PromptFormFieldErrors;
  values?: Partial<PromptFormValues>;
};

export type PromptFormAction = (
  previousState: PromptFormState,
  formData: FormData,
) => Promise<PromptFormState>;

type PromptFormProps = {
  mode: "create" | "edit";
  action: PromptFormAction;
  initialValues?: Partial<PromptFormValues>;
  promptId?: string;
};

const EMPTY_VALUES: PromptFormValues = {
  title: "",
  slug: "",
  description: "",
  prompt: "",
  category: "",
  tags: [],
  difficulty: "Beginner",
  aiModels: [],
  variables: [],
  exampleInput: "",
  exampleOutput: "",
  tips: [],
  featured: false,
  published: false,
};

const INITIAL_STATE: PromptFormState = {
  success: false,
  message: "",
  errors: {},
};

const inputClass =
  "w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500";

const textareaClass =
  "w-full resize-y rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 text-xs font-medium text-red-400">
      {message}
    </p>
  );
}

export default function PromptForm({
  mode,
  action,
  initialValues,
  promptId,
}: PromptFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    INITIAL_STATE,
  );

  const values = useMemo<PromptFormValues>(
    () => ({
      ...EMPTY_VALUES,
      ...initialValues,
      ...state.values,

      tags:
        state.values?.tags ??
        initialValues?.tags ??
        EMPTY_VALUES.tags,

      aiModels:
        state.values?.aiModels ??
        initialValues?.aiModels ??
        EMPTY_VALUES.aiModels,

      variables:
        state.values?.variables ??
        initialValues?.variables ??
        EMPTY_VALUES.variables,

      tips:
        state.values?.tips ??
        initialValues?.tips ??
        EMPTY_VALUES.tips,
    }),
    [initialValues, state.values],
  );

  const [title, setTitle] = useState(values.title);
  const [slug, setSlug] = useState(values.slug);

  const [slugEditedManually, setSlugEditedManually] =
    useState(mode === "edit" || Boolean(values.slug));

  useEffect(() => {
    setTitle(values.title);
    setSlug(values.slug);
  }, [values.title, values.slug]);

  function handleTitleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const nextTitle = event.target.value;

    setTitle(nextTitle);

    if (!slugEditedManually) {
      setSlug(slugify(nextTitle));
    }
  }

  function handleSlugChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const nextSlug = slugify(event.target.value);

    setSlug(nextSlug);
    setSlugEditedManually(Boolean(nextSlug));
  }

  function handleSlugBlur() {
    if (!slug.trim()) {
      setSlug(slugify(title));
      setSlugEditedManually(false);
    }
  }

  const submitLabel =
    mode === "create"
      ? "Create Prompt"
      : "Save Changes";

  return (
    <form action={formAction} className="space-y-6">
      {promptId && (
        <input
          type="hidden"
          name="promptId"
          value={promptId}
        />
      )}

      {state.message && (
        <div
          role="alert"
          className={[
            "rounded-xl border px-4 py-3 text-sm",
            state.success
              ? "border-green-800 bg-green-950/40 text-green-300"
              : "border-red-800 bg-red-950/40 text-red-300",
          ].join(" ")}
        >
          {state.message}
        </div>
      )}

      {state.errors.form && !state.message && (
        <div
          role="alert"
          className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300"
        >
          {state.errors.form}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Enter the prompt title, URL and classification.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Prompt Title *
            </label>

            <input
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Example: YouTube Script Generator"
              required
              autoComplete="off"
              aria-invalid={Boolean(
                state.errors.title,
              )}
              className={inputClass}
            />

            <FieldError
              message={state.errors.title}
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              URL Slug *
            </label>

            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={handleSlugChange}
              onBlur={handleSlugBlur}
              placeholder="youtube-script-generator"
              required
              autoComplete="off"
              spellCheck={false}
              aria-invalid={Boolean(
                state.errors.slug,
              )}
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-500">
              Public URL: /prompts/
              {slug || "your-prompt-slug"}
            </p>

            <FieldError
              message={state.errors.slug}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Category *
            </label>

            <input
              id="category"
              name="category"
              defaultValue={values.category}
              placeholder="Example: YouTube"
              required
              autoComplete="off"
              className={inputClass}
            />

            <FieldError
              message={state.errors.category}
            />
          </div>

          <div>
            <label
              htmlFor="difficulty"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Difficulty
            </label>

            <select
              id="difficulty"
              name="difficulty"
              defaultValue={values.difficulty}
              className={inputClass}
            >
              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>
            </select>

            <FieldError
              message={state.errors.difficulty}
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Prompt Content
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Add the public description and reusable prompt instructions.
          </p>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Description *
            </label>

            <textarea
              id="description"
              name="description"
              defaultValue={values.description}
              rows={4}
              required
              placeholder="Explain what this prompt helps the user create."
              className={textareaClass}
            />

            <FieldError
              message={state.errors.description}
            />
          </div>

          <div>
            <label
              htmlFor="prompt"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Prompt *
            </label>

            <textarea
              id="prompt"
              name="prompt"
              defaultValue={values.prompt}
              rows={18}
              required
              placeholder="Write the complete AI prompt here."
              className={`${textareaClass} min-h-96 font-mono`}
            />

            <FieldError
              message={state.errors.prompt}
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Prompt Metadata
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Use commas to separate multiple values.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="tags"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Tags
            </label>

            <input
              id="tags"
              name="tags"
              defaultValue={values.tags.join(", ")}
              placeholder="YouTube, Content, Script"
              className={inputClass}
            />

            <FieldError
              message={state.errors.tags}
            />
          </div>

          <div>
            <label
              htmlFor="aiModels"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Supported AI Models
            </label>

            <input
              id="aiModels"
              name="aiModels"
              defaultValue={values.aiModels.join(
                ", ",
              )}
              placeholder="ChatGPT, Claude, Gemini"
              className={inputClass}
            />

            <FieldError
              message={state.errors.aiModels}
            />
          </div>

          <div>
            <label
              htmlFor="variables"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Variables
            </label>

            <input
              id="variables"
              name="variables"
              defaultValue={values.variables.join(
                ", ",
              )}
              placeholder="TOPIC, AUDIENCE, TONE"
              className={inputClass}
            />

            <FieldError
              message={state.errors.variables}
            />
          </div>

          <div>
            <label
              htmlFor="tips"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Tips
            </label>

            <input
              id="tips"
              name="tips"
              defaultValue={values.tips.join(", ")}
              placeholder="Be specific, Add examples"
              className={inputClass}
            />

            <FieldError
              message={state.errors.tips}
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Examples
          </h2>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          <div>
            <label
              htmlFor="exampleInput"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Example Input
            </label>

            <textarea
              id="exampleInput"
              name="exampleInput"
              defaultValue={values.exampleInput}
              rows={8}
              placeholder="Show a realistic user input."
              className={textareaClass}
            />

            <FieldError
              message={state.errors.exampleInput}
            />
          </div>

          <div>
            <label
              htmlFor="exampleOutput"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Example Output
            </label>

            <textarea
              id="exampleOutput"
              name="exampleOutput"
              defaultValue={values.exampleOutput}
              rows={8}
              placeholder="Show an example of the expected result."
              className={textareaClass}
            />

            <FieldError
              message={state.errors.exampleOutput}
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Publishing Settings
          </h2>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <label className="flex items-start justify-between gap-4 rounded-xl border border-gray-800 bg-gray-950 p-4">
            <span>
              <span className="block text-sm font-semibold text-gray-200">
                Published
              </span>

              <span className="mt-1 block text-xs leading-5 text-gray-500">
                Published prompts are visible publicly.
              </span>
            </span>

            <input
              name="published"
              type="checkbox"
              value="true"
              defaultChecked={values.published}
              className="h-5 w-5 cursor-pointer accent-blue-600"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded-xl border border-gray-800 bg-gray-950 p-4">
            <span>
              <span className="block text-sm font-semibold text-gray-200">
                Featured
              </span>

              <span className="mt-1 block text-xs leading-5 text-gray-500">
                Featured prompts can receive prominent placement.
              </span>
            </span>

            <input
              name="featured"
              type="checkbox"
              value="true"
              defaultChecked={values.featured}
              className="h-5 w-5 cursor-pointer accent-blue-600"
            />
          </label>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <a
          href="/admin/prompts"
          className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-white"
        >
          Cancel
        </a>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}