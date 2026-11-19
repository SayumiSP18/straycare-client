import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, PawPrint, X } from "lucide-react";
import Logo from "../common/Logo";
import { useAuth } from "../../hooks/useAuth";
import { useT } from "../../hooks/useT";
import { useAppDispatch } from "../../hooks/useAppRedux";
import { logout } from "../../store/authSlice";
import { setLang } from "../../store/langSlice";
import { TKey } from "../../i18n/translations";

const main: { to: string; k: TKey }[] = [
  { to: "/", k: "home" }, { to: "/about", k: "about" }, { to: "/adopt", k: "waiting" },
  { to: "/dashboard", k: "dashboard" }, { to: "/sponsor", k: "sponsor" }, { to: "/contact", k: "contact" },
];
const involved: { to: string; k: TKey }[] = [
  { to: "/how-to-help", k: "howHelp" }, { to: "/stray-guide", k: "seeStray" }, { to: "/report", k: "report" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { t, lang } = useT();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-bold transition ${isActive ? "text-golden-300" : "text-ink-100 hover:text-golden-200"}`;
  const out = () => { dispatch(logout()); setOpen(false); navigate("/"); };

  const langBtn = (
    <button onClick={() => dispatch(setLang(lang === "en" ? "si" : "en"))}
      className="rounded-lg border border-ink-500 px-3 py-1.5 text-sm font-bold text-ink-100 hover:border-golden-400"
      aria-label="Switch language">
      {lang === "en" ? "සිංහල" : "English"}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-ink-900">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 font-heading text-2xl text-white">
          <Logo size={60} />
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            StrayCare <PawPrint className="h-5 w-5 text-golden-400" />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {main.slice(0, 2).map((l) => <NavLink key={l.to} to={l.to} end={l.to === "/"} className={cls}>{t(l.k)}</NavLink>)}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-bold text-ink-100 hover:text-golden-200">
              {t("getInvolved")} <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full w-64 rounded-xl bg-white p-2 opacity-0 shadow-soft transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {involved.map((l) => (
                <Link key={l.to} to={l.to} className="block rounded-lg px-3 py-2 text-sm font-bold text-ink-900 hover:bg-golden-50">{t(l.k)}</Link>
              ))}
            </div>
          </div>
          {main.slice(2).map((l) => <NavLink key={l.to} to={l.to} className={cls}>{t(l.k)}</NavLink>)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {langBtn}
          <Link to="/donate" className="btn-primary">{t("donate")}</Link>
          {user ? <button className="btn border border-ink-500 text-white hover:bg-ink-700" onClick={out}>{t("logout")}</button>
            : <Link to="/auth" className="btn border border-ink-500 text-white hover:bg-ink-700">{t("login")}</Link>}
        </div>

        <button className="text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="space-y-4 border-t border-ink-700 px-4 py-4 lg:hidden">
          {[...main, ...involved].map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `block ${cls({ isActive })}`} onClick={() => setOpen(false)}>{t(l.k)}</NavLink>
          ))}
          <div className="flex flex-wrap gap-3 pt-2">
            {langBtn}
            <Link to="/donate" className="btn-primary" onClick={() => setOpen(false)}>{t("donate")}</Link>
            {user ? <button className="btn border border-ink-500 text-white" onClick={out}>{t("logout")}</button>
              : <Link to="/auth" className="btn border border-ink-500 text-white" onClick={() => setOpen(false)}>{t("login")}</Link>}
          </div>
        </div>
      )}
    </header>
  );
}