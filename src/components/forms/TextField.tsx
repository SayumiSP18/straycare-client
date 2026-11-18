import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> { label: string; error?: string }

export default function TextField({ label, error, id, ...rest }: Props) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1 block text-sm font-bold">{label}</label>
      <input id={fieldId} className="input" aria-invalid={!!error} {...rest} />
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
