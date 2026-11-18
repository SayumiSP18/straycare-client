import { Link } from "react-router-dom";
import { useT } from "../hooks/useT";
import { posts } from "../data/posts";

export default function Sponsor() {
  const { t, lang } = useT();
  return (
    <div className="container-page py-12">
      <h1 className="text-4xl font-bold">{t("sponsorTitle")}</h1>
      <p className="mt-2 text-ink-500">{t("sponsorSub")}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.id} className="card p-6">
            <h2 className="text-xl font-bold">{p.title[lang]}</h2>
            <p className="mt-3 text-sm text-ink-700">{p.excerpt[lang]}</p>
          </article>
        ))}
      </div>
      <section className="mt-10 rounded-3xl bg-golden-100 p-8">
        <h2 className="text-2xl font-bold">{t("sponsorCta")}</h2>
        <p className="mt-2 text-ink-700">{t("sponsorCtaText")}</p>
        <Link to="/contact" className="btn-dark mt-5">{t("contact")}</Link>
      </section>
    </div>
  );
}
