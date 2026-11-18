import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { useT } from "../../hooks/useT";

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="mt-20 bg-ink-900 text-ink-200">
      <div className="container-page grid gap-6 py-10 sm:grid-cols-3 sm:items-center">
        <div className="flex items-center gap-3 font-heading text-2xl text-white"><Logo size={56} /> StrayCare</div>
        <p className="text-sm">{t("footer")}</p>
        <div className="flex gap-4 text-sm font-bold sm:justify-end">
          <Link to="/donate" className="hover:text-golden-300">{t("donate")}</Link>
          <Link to="/contact" className="hover:text-golden-300">{t("contact")}</Link>
        </div>
      </div>
      <p className="border-t border-ink-700 py-4 text-center text-xs text-ink-400">© {new Date().getFullYear()} StrayCare</p>
    </footer>
  );
}