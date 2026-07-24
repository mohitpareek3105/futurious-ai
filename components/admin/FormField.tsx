import type {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | number;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  autoComplete?: string;
  readOnly?: boolean;
  disabled?: boolean;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
};

export default function FormField({
  id,
  name,
  label,
  defaultValue,
  type = "text",
  placeholder,
  helpText,
  error,
  required = false,
  min,
  max,
  step,
  autoComplete,
  readOnly = false,
  disabled = false,
  inputMode,
}: FormFieldProps) {
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

      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        autoComplete={autoComplete}
        readOnly={readOnly}
        disabled={disabled}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className={[
          "w-full rounded-xl border bg-gray-950 px-4 py-3",
          "text-sm text-white outline-none transition",
          "placeholder:text-gray-600",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "read-only:cursor-default read-only:bg-gray-900",
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