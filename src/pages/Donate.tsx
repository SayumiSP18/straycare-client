import { FormEvent, useState } from "react";
import { useT } from "../hooks/useT";
import { donate } from "../services/miscService";
import { errorMessage } from "../services/api";

const presets = [500, 1000, 2500, 5000];

export default function Donate() {
  const { t } = useT();
  const [amount, setAmount] = useState("1000");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await donate(Number(amount));
      setStatus({ ok: true, text: t("thanks") });
    } catch (err) {
      setStatus({ ok: false, text: errorMessage(err) });
    } finally { setLoading(false); }
  };

  return (
    <div className="container-page max-w-xl py-12">
      <h1 className="text-4xl font-bold">{t("donateTitle")}</h1>
      <p className="mt-2 text-ink-500">{t("donateSub")}</p>
      <form onSubmit={onSubmit} className="card mt-8 space-y-5 p-6 sm:p-8">
        <p className="text-sm font-bold">{t("amountLabel")}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {presets.map((p) => (
            <button type="button" key={p} onClick={() => setAmount(String(p))} aria-pressed={amount === String(p)}
              className={`rounded-xl border-2 py-2.5 text-sm font-bold ${amount === String(p) ? "border-golden-500 bg-golden-100" : "border-ink-200"}`}>
              {p.toLocaleString()}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="amt" className="mb-1 block text-sm font-bold">{t("customAmount")}</label>
          <input id="amt" type="number" min={100} className="input" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        {status && <p role="status" className={`rounded-lg p-3 text-sm ${status.ok ? "bg-golden-50 text-golden-700" : "bg-red-50 text-red-800"}`}>{status.text}</p>}
        <button className="btn-primary w-full" disabled={loading || Number(amount) < 100}>{t("donateBtn")}</button>
      </form>
    </div>
  );
}
