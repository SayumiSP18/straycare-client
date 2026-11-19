import { FormEvent, useState } from "react";
import TextField from "./TextField";
import { useAppDispatch } from "../../hooks/useAppRedux";
import { useAuth } from "../../hooks/useAuth";
import { register } from "../../store/authSlice";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState<"CITIZEN" | "RESCUER">("CITIZEN");
  const [formError, setFormError] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error, notice } = useAuth();

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) return setFormError("Password must be at least 8 characters.");
    setFormError("");
    dispatch(register({ ...form, role }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TextField label="Full name" value={form.name} onChange={set("name")} placeholder="Enter your full name" required />
      <TextField label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required />
      <TextField label="Password" type="password" value={form.password} onChange={set("password")} placeholder="At least 8 characters" error={formError} required />
      <fieldset>
        <legend className="mb-1 text-sm font-bold">I want to join as</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["CITIZEN", "RESCUER"] as const).map((r) => (
            <button
              type="button" key={r} onClick={() => setRole(r)} aria-pressed={role === r}
              className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold ${role === r ? "border-golden-500 bg-golden-100" : "border-ink-200 bg-white"}`}
            >
              {r === "CITIZEN" ? "Citizen / Adopter" : "Rescuer"}
            </button>
          ))}
        </div>
        {role === "RESCUER" && <p className="mt-2 text-xs text-ink-500">Rescuer accounts need admin approval before you can log in.</p>}
      </fieldset>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {notice && <p role="status" className="rounded-lg bg-golden-50 p-3 text-sm text-golden-700">{notice}</p>}
      <button className="btn-primary w-full" disabled={loading}>{loading ? "Creating account…" : "Create account"}</button>
    </form>
  );
}