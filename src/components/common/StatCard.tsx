import { ReactNode } from "react";

interface Props { label: string; value: string | number; icon: ReactNode; note?: string }

export default function StatCard({ label, value, icon, note }: Props) {
  return (
    <div className="card flex items-start gap-4 p-5">
      <div className="rounded-xl bg-golden-100 p-3 text-golden-700">{icon}</div>
      <div>
        <p className="text-sm text-ink-500">{label}</p>
        <p className="font-display text-2xl font-bold">{value}</p>
        {note && <p className="text-xs text-ink-500">{note}</p>}
      </div>
    </div>
  );
}
