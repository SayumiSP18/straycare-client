import { useT } from "../hooks/useT";
import { TKey } from "../i18n/translations";

const blocks: { h: TKey; p: TKey }[] = [
  { h: "whoTitle", p: "whoText" }, { h: "whatTitle", p: "whatText" }, { h: "goalTitle", p: "goalText" },
];
const policies: TKey[] = ["pol1", "pol2", "pol3", "pol4", "pol5"];

export default function About() {
  const { t } = useT();
  return (
    <div className="container-page py-12">
      <h1 className="text-4xl font-bold">{t("aboutTitle")}</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {blocks.map((b) => (
          <section key={b.h} className="card p-6">
            <h2 className="text-2xl font-bold">{t(b.h)}</h2>
            <p className="mt-3 text-ink-700">{t(b.p)}</p>
          </section>
        ))}
      </div>
      <section className="mt-10 rounded-3xl bg-ink-900 p-8 text-white">
        <h2 className="text-2xl font-bold">{t("policiesTitle")}</h2>
        <ul className="mt-4 space-y-3">
          {policies.map((p) => (
            <li key={p} className="flex gap-3 text-ink-100"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-golden-400" />{t(p)}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
