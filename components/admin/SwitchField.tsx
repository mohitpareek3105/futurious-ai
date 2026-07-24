type SwitchFieldProps = {
  id: string;
  name: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
  error?: string;
};

export default function SwitchField({
  id,
  name,
  label,
  description,
  defaultChecked = false,
  error,
}: SwitchFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={[
          "flex cursor-pointer items-start justify-between gap-5",
          "rounded-xl border bg-gray-950 p-4 transition",
          error
            ? "border-red-700"
            : "border-gray-700 hover:border-gray-600",
        ].join(" ")}
      >
        <span>
          <span className="block text-sm font-semibold text-white">
            {label}
          </span>

          <span className="mt-1 block text-xs leading-5 text-gray-500">
            {description}
          </span>
        </span>

        <span className="relative mt-1 inline-flex shrink-0">
          <input
            id={id}
            name={name}
            type="checkbox"
            defaultChecked={defaultChecked}
            value="true"
            className="peer sr-only"
            aria-invalid={Boolean(error)}
          />

          <span
            className={[
              "h-6 w-11 rounded-full bg-gray-700 transition",
              "peer-checked:bg-blue-600",
              "peer-focus-visible:outline",
              "peer-focus-visible:outline-2",
              "peer-focus-visible:outline-offset-2",
              "peer-focus-visible:outline-blue-500",
            ].join(" ")}
          />

          <span
            className={[
              "pointer-events-none absolute left-1 top-1",
              "h-4 w-4 rounded-full bg-white transition",
              "peer-checked:translate-x-5",
            ].join(" ")}
          />
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="mt-2 text-xs font-medium text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}