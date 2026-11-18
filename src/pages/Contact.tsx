import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import TextField from "../components/forms/TextField";
import { useT } from "../hooks/useT";
import { sendContact } from "../services/miscService";
import { errorMessage } from "../services/api";

// Replace these with your real contact details.
const info = [
  { icon: Mail, text: "hello@straycare.lk" },
  { icon: Phone, text: "+94 00 000 0000" },
  { icon: MapPin, text: "Panadura · Colombo · Kandy" },
];

export default function Contact() {
  const { t } = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContact(form);
      setStatus({ ok: true, text: t("sent") });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ ok: false, text: errorMessage(err) });
    } finally { setLoading(false); }
  };

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">{t("contactTitle")}</h1>
        <p className="mt-2 max-w-md text-ink-500">{t("contactSub")}</p>
        <ul className="mt-8 space-y-4">
          {info.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-ink-700"><span className="rounded-xl bg-golden-100 p-2.5 text-golden-700"><Icon className="h-5 w-5" /></span>{text}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
        <TextField label={t("name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <TextField label={t("email")} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <div>
          <label htmlFor="msg" className="mb-1 block text-sm font-bold">{t("message")}</label>
          <textarea id="msg" rows={5} className="input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        </div>
        {status && <p role="status" className={`rounded-lg p-3 text-sm ${status.ok ? "bg-golden-50 text-golden-700" : "bg-red-50 text-red-800"}`}>{status.text}</p>}
        <button className="btn-primary w-full" disabled={loading}>{t("send")}</button>
      </form>
    </div>
  );
}
