import { useState } from "react";
import { Search } from "lucide-react";
import PetCard from "../components/common/PetCard";
import Spinner from "../components/common/Spinner";
import { useFetch } from "../hooks/useFetch";
import { useT } from "../hooks/useT";
import { getAnimals } from "../services/animalService";



export default function Adopt() {
  const { t } = useT();
  const filters = [{ v: "", l: t("all") }, { v: "DOG", l: t("dogs") }, { v: "CAT", l: t("cats") }];
  const [species, setSpecies] = useState("");
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetch(() => getAnimals({ species: species || undefined, search: search || undefined }), [species, search]);

  return (
    <div className="container-page py-12">
      <h1 className="text-4xl font-bold">{t("waitingTitle")}</h1>
      <p className="mt-2 text-ink-500">{t("adoptSub")}</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2" role="group" aria-label="Filter by species">
          {filters.map((f) => (
            <button key={f.l} onClick={() => setSpecies(f.v)} aria-pressed={species === f.v}
              className={`rounded-full border-2 px-5 py-2 text-sm font-bold ${species === f.v ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 bg-white"}`}>
              {f.l}
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input className="input pl-10" placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search animals" />
        </div>
      </div>

      <div className="mt-8">
        {loading ? <Spinner /> : error ? (
          <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p>
        ) : data && data.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{data.map((p) => <PetCard key={p._id} pet={p} />)}</div>
        ) : (
          <p className="card p-10 text-center text-ink-500">{t("noMatch")}</p>
        )}
      </div>
    </div>
  );
}
