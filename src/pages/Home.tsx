import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, MapPinned, PawPrint, Stethoscope } from "lucide-react";
import PetCard from "../components/common/PetCard";
import Spinner from "../components/common/Spinner";
import { useFetch } from "../hooks/useFetch";
import { useT } from "../hooks/useT";
import { getAnimals } from "../services/animalService";
import { TKey } from "../i18n/translations";
import ctaPeoplePetImg from "../assets/catdog22.png";

const steps: { icon: typeof PawPrint; t: TKey; d: TKey }[] = [
  { icon: MapPinned, t: "step1t", d: "step1d" },
  { icon: PawPrint, t: "step2t", d: "step2d" },
  { icon: Stethoscope, t: "step3t", d: "step3d" },
  { icon: HeartHandshake, t: "step4t", d: "step4d" },
];

const HERO_IMAGES = [
  "/assets/animal_pics/catanddog1.jpg",
  "/assets/animal_pics/catanddog2.jpg",
];

export default function Home() {
  const { t } = useT();
  const { data: pets, loading } = useFetch(() => getAnimals(), []);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const currentHeroSrc = HERO_IMAGES[heroIndex];

  return (
    <>
      <section className="bg-gradient-to-b from-golden-100 to-cream">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="font-script text-3xl text-golden-700 sm:text-4xl">Pawsitivity starts here</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.3] tracking-wider text-ink-900 sm:text-4xl">
              {t("voice")}
            </h1>
            <p className="mt-6 max-w-lg text-lg font-semibold text-ink-700">{t("heroText")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/adopt" className="btn-primary px-7 py-3 text-base">{t("adopt")}</Link>
              <Link to="/report" className="btn-dark px-7 py-3 text-base">{t("report")}</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-golden-300/40" />
            <img
              src={currentHeroSrc}
              onError={(e) => {
                const nextIndex = (heroIndex + 1) % HERO_IMAGES.length;
                if (nextIndex !== heroIndex) {
                  e.currentTarget.src = HERO_IMAGES[nextIndex];
                }
              }}
              alt="Rescued cat and dog"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl text-ink-900 sm:text-4xl">{t("waitingTitle")}</h2>
            <p className="mt-1 text-ink-500">{t("waitingSub")}</p>
          </div>
          <Link to="/adopt" className="shrink-0 text-sm font-bold text-golden-700 hover:underline">{t("seeAll")}</Link>
        </div>
        {loading ? <Spinner /> : pets && pets.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{pets.slice(0, 4).map((p) => <PetCard key={p._id} pet={p} />)}</div>
        ) : <p className="card p-8 text-center text-ink-500">{t("empty")}</p>}
      </section>

      <section className="bg-ink-900 py-16 text-white">
        <div className="container-page">
          <h2 className="font-heading text-3xl sm:text-4xl">{t("howTitle")}</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, t: title, d }, i) => (
              <li key={title} className="rounded-2xl bg-ink-700/60 p-6">
                <Icon className="h-7 w-7 text-golden-400" />
                <h3 className="mt-4 font-heading text-xl">{i + 1}. {t(title)}</h3>
                <p className="mt-2 text-sm text-ink-200">{t(d)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid items-center gap-8 rounded-3xl bg-golden-100 p-6 sm:p-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img
              src={ctaPeoplePetImg}
              alt="People holding a rescued cat and dog"
              className="aspect-[4/3] w-full object-cover object-top"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl tracking-wide text-ink-900 sm:text-3xl lg:text-4xl">
              {t("voice")}
            </h2>
            <p className="mt-3 max-w-xl font-semibold text-ink-700">
              {t("ctaText")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link to="/donate" className="btn-dark px-7 py-3">
                {t("donate")}
              </Link>
              <Link to="/sponsor" className="btn-outline px-7 py-3">
                {t("pupdatesLink")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}