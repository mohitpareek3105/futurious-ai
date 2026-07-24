type TextareaFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  rows?: number;
};

export default function TextareaField({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  helpText,
  error,
  required = false,
  rows = 5,
}: TextareaFieldProps) {
  const descriptionId = helpText
    ? `${id}-description`
    : undefined;

  const errorId = error ? `${id}-error` : undefined;

  const describedBy = [descriptionId, errorId]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-200"
      >
        {label}

        {required && (
          <span
            aria-hidden="true"
            className="ml-1 text-red-400"
          >
            *
          </span>
        )}
      </label>

      <textarea
        id={id}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className={[
          "w-full resize-y rounded-xl border bg-gray-950 px-4 py-3",
          "text-sm leading-6 text-white outline-none transition",
          "placeholder:text-gray-600",
          error
            ? "border-red-700 focus:border-red-500"
            : "border-gray-700 focus:border-blue-500",
        ].join(" ")}
      />

      {helpText && (
        <p
          id={descriptionId}
          className="mt-2 text-xs leading-5 text-gray-500"
        >
          {helpText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-xs font-medium text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}