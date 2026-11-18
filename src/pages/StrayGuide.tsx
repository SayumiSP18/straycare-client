import { Link } from "react-router-dom";
import { useT } from "../hooks/useT";
import { TKey } from "../i18n/translations";

const steps: TKey[] = ["g1", "g2", "g3", "g4", "g5", "g6"];

export default function StrayGuide() {
  const { t } = useT();
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-4xl font-bold">{t("guideTitle")}</h1>
      <p className="mt-2 text-ink-500">{t("guideSub")}</p>
      <ol className="mt-8 space-y-4">
        {steps.map((s, i) => (
          <li key={s} className="card flex gap-4 p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-golden-500 font-bold text-ink-900">{i + 1}</span>
            <p className="pt-1 text-ink-700">{t(s)}</p>
          </li>
        ))}
      </ol>
      <Link to="/report" className="btn-dark mt-8">{t("report")}</Link>
    </div>
  );
}
