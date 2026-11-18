import { Link } from "react-router-dom";
import { Gift, HandHeart, Home, Share2, Users } from "lucide-react";
import { useT } from "../hooks/useT";
import { TKey } from "../i18n/translations";

const items: { icon: typeof Home; t: TKey; d: TKey; to: string }[] = [
  { icon: Home, t: "h1t", d: "h1d", to: "/adopt" },
  { icon: HandHeart, t: "h2t", d: "h2d", to: "/contact" },
  { icon: Users, t: "h3t", d: "h3d", to: "/contact" },
  { icon: Gift, t: "h4t", d: "h4d", to: "/donate" },
  { icon: Share2, t: "h5t", d: "h5d", to: "/" },
];

export default function HowToHelp() {
  const { t } = useT();
  return (
    <div className="container-page py-12">
      <h1 className="text-4xl font-bold">{t("helpTitle")}</h1>
      <p className="mt-2 text-ink-500">{t("helpSub")}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, t: title, d, to }) => (
          <Link key={title} to={to} className="card p-6 transition hover:-translate-y-1">
            <span className="inline-flex rounded-xl bg-golden-100 p-3 text-golden-700"><Icon /></span>
            <h2 className="mt-4 text-xl font-bold">{t(title)}</h2>
            <p className="mt-2 text-sm text-ink-700">{t(d)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
