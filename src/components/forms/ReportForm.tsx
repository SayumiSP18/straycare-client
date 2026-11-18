// import { FormEvent, useState } from "react";
// import { ImagePlus } from "lucide-react";
// import TextField from "./TextField";
// import { createReport } from "../../service/reportService";
// import { errorMessage } from "../../service/api";
// import { Condition, Species } from "../../types";
import { useState } from "react";
import type { FormEvent } from "react";
import { ImagePlus } from "lucide-react";
import TextField from "./TextField";
import { createReport } from "../../services/reportService";
import { errorMessage } from "../../services/api";
import type { Condition, Species } from "../../types";


const conditions: { value: Condition; label: string }[] = [
  { value: "HEALTHY", label: "Healthy" },
  { value: "INJURED", label: "Injured" },
  { value: "URGENT", label: "Urgent" },
];

export default function ReportForm() {
  const [species, setSpecies] = useState<Species>("DOG");
  const [condition, setCondition] = useState<Condition>("HEALTHY");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const fd = new FormData();
    fd.append("species", species);
    fd.append("condition", condition);
    fd.append("location", location);
    fd.append("description", description);
    if (photo) fd.append("photo", photo);
    try {
      await createReport(fd);
      setStatus({ type: "ok", text: "Report sent. A rescuer will pick it up soon." });
      setLocation(""); setDescription(""); setPhoto(null); setCondition("HEALTHY");
    } catch (err) {
      setStatus({ type: "err", text: errorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-6 p-6 sm:p-8">
      <div>
        <p className="mb-2 text-sm font-bold">Animal</p>
        <div className="grid grid-cols-2 gap-2">
          {(["DOG", "CAT"] as const).map((s) => (
            <button type="button" key={s} onClick={() => setSpecies(s)} aria-pressed={species === s}
              className={`rounded-xl border-2 py-2.5 text-sm font-bold ${species === s ? "border-golden-500 bg-golden-100" : "border-ink-200"}`}>
              {s === "DOG" ? "Dog" : "Cat"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-bold">Condition</p>
        <div className="grid grid-cols-3 gap-2">
          {conditions.map((c) => (
            <button type="button" key={c.value} onClick={() => setCondition(c.value)} aria-pressed={condition === c.value}
              className={`rounded-xl border-2 py-2.5 text-sm font-bold ${condition === c.value ? (c.value === "URGENT" ? "border-ink-900 bg-ink-900 text-white" : "border-golden-500 bg-golden-100") : "border-ink-200"}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <TextField label="Where did you see it?" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Street, landmark, town" required />

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-bold">Description</label>
        <textarea id="description" rows={4} className="input" value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Limping on the right hind leg, hiding near the bus stand, no collar" required />
      </div>

      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-golden-300 bg-golden-50 p-6 text-center hover:bg-golden-100">
        <ImagePlus className="h-7 w-7 text-golden-600" />
        <span className="text-sm font-bold">{photo ? photo.name : "Add a photo"}</span>
        <span className="text-xs text-ink-500">JPG or PNG, up to 5 MB</span>
        <input type="file" accept="image/png,image/jpeg" className="sr-only" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
      </label>

      {status && (
        <p role={status.type === "err" ? "alert" : "status"}
          className={`rounded-lg p-3 text-sm ${status.type === "ok" ? "bg-golden-50 text-golden-700" : "bg-red-50 text-red-800"}`}>
          {status.text}
        </p>
      )}
      <button className="btn-dark w-full" disabled={loading}>{loading ? "Sending…" : "Send report"}</button>
    </form>
  );
}
