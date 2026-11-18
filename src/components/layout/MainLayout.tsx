import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useT } from "../../hooks/useT";

export default function MainLayout() {
  const { lang } = useT();
  const { pathname } = useLocation();
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
