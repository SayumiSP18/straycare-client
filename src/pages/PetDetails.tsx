import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PawPrint } from "lucide-react";
import Spinner from "../components/common/Spinner";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import { getAnimal, requestAdoption } from "../services/animalService";
import { errorMessage } from "../services/api";

export default function PetDetails() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pet, loading, error } = useFetch(() => getAnimal(id), [id]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  if (loading) return <Spinner />;
  if (error || !pet) return <p role="alert" className="container-page py-16 text-red-800">{error ?? "Animal not found"}</p>;

  const adopt = async () => {
    if (!user) return navigate("/auth");
    try {
      await requestAdoption(pet._id);
      setMsg({ ok: true, text: "Adoption request sent. We will contact you soon." });
    } catch (e) {
      setMsg({ ok: false, text: errorMessage(e) });
    }
  };

  return (
    <div className="container-page py-10">
      <Link to="/adopt" className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-ink-500 hover:text-ink-900">
        <ArrowLeft className="h-4 w-4" /> Back to all animals
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-golden-50">
            {pet.photos[photoIdx]
              ? <img src={pet.photos[photoIdx]} alt={pet.name} className="h-full w-full object-cover" />
              : <div className="flex h-full items-center justify-center text-golden-300"><PawPrint className="h-16 w-16" /></div>}
          </div>
          {pet.photos.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {pet.photos.map((src, i) => (
                <button key={src} onClick={() => setPhotoIdx(i)} aria-label={`Photo ${i + 1}`}
                  className={`overflow-hidden rounded-xl border-2 ${i === photoIdx ? "border-golden-500" : "border-transparent"}`}>
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold">{pet.name}</h1>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold">
            <span className="rounded-full bg-ink-900 px-3 py-1 text-white">{pet.species === "DOG" ? "Dog" : "Cat"}</span>
            {pet.breed && <span className="rounded-full bg-ink-100 px-3 py-1">{pet.breed}</span>}
            <span className="rounded-full bg-ink-100 px-3 py-1">{pet.ageMonths < 12 ? `${pet.ageMonths} months` : `${Math.floor(pet.ageMonths / 12)} years`}</span>
            {pet.vaccinated && <span className="rounded-full bg-golden-100 px-3 py-1 text-golden-700">Vaccinated</span>}
            {pet.neutered && <span className="rounded-full bg-golden-100 px-3 py-1 text-golden-700">Neutered</span>}
          </div>
          <h2 className="mt-8 text-2xl font-bold">Story</h2>
          <p className="mt-2 max-w-prose text-ink-700">{pet.story ?? "Story coming soon."}</p>
          {pet.location && <p className="mt-4 text-sm text-ink-500">Currently at: {pet.location}</p>}

          <p className="mt-6 rounded-xl bg-golden-50 p-4 text-sm text-ink-700">
            Adopters agree to send a short welfare check-in for six months after adoption.
          </p>
          <button className="btn-primary mt-6 w-full sm:w-auto sm:px-10" onClick={adopt} disabled={pet.status !== "AVAILABLE"}>
            {pet.status === "AVAILABLE" ? `Adopt ${pet.name}` : "Not available"}
          </button>
          {msg && <p role="status" className={`mt-4 text-sm ${msg.ok ? "text-golden-700" : "text-red-800"}`}>{msg.text}</p>}
        </div>
      </div>
    </div>
  );
}
