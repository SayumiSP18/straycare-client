import { PawPrint } from "lucide-react";

export default function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-2 py-16 text-ink-500">
      <PawPrint className="h-5 w-5 animate-bounce text-golden-500" />
      <span className="text-sm font-semibold">{label}…</span>
    </div>
  );
}
