import { Link } from "react-router-dom";
import { MapPin, PawPrint, ShieldCheck } from "lucide-react";
import { Animal } from "../../types";
import { useT } from "../../hooks/useT";

export default function PetCard({ pet }: { pet: Animal }) {
  const { t } = useT();
  const age = pet.ageMonths < 12 ? `${pet.ageMonths} ${t("mo")}` : `${Math.floor(pet.ageMonths / 12)} ${t("yr")}`;
  return (
    <article className="card overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[4/3] bg-golden-50">
        {pet.photos[0] ? (
          <img src={pet.photos[0]} alt={pet.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-golden-300"><PawPrint className="h-12 w-12" /></div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink-900/90 px-3 py-1 text-xs font-bold text-white">
          {pet.species === "DOG" ? t("dog") : t("cat")}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-heading text-2xl text-ink-900">{pet.name}</h3>
        <p className="text-sm font-semibold text-ink-500">{age}{pet.breed ? ` · ${pet.breed}` : ""}</p>
        {pet.location && <p className="flex items-center gap-1 text-sm text-ink-500"><MapPin className="h-4 w-4" />{pet.location}</p>}
        {pet.vaccinated && <p className="flex items-center gap-1 text-sm font-semibold text-golden-700"><ShieldCheck className="h-4 w-4" />{t("vaccinated")}</p>}
        <Link to={`/adopt/${pet._id}`} className="btn-outline mt-2 w-full">{t("meet")} {pet.name}</Link>
      </div>
    </article>
  );
}