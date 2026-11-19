import { Link } from "react-router-dom";
import { HeartPulse, Home, PawPrint } from "lucide-react";
import StatCard from "../components/common/StatCard";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { useT } from "../hooks/useT";
import { getReports } from "../services/reportService";
import { getStats } from "../services/miscService";
import { StrayReport } from "../types";

export default function Dashboard() {
  const { t } = useT();
  const { user } = useAuth();
  const { data: stats, loading } = useFetch(() => getStats().catch(() => null), []);
  const { data: reports } = useFetch<StrayReport[]>(() => (user ? getReports() : Promise.resolve([])), [user?._id]);

  const s = stats ?? { saved: 0, rehomed: 0, inCare: 0, fundRaised: 0, fundGoal: 0 };
  const pct = s.fundGoal > 0 ? Math.min(100, Math.round((s.fundRaised / s.fundGoal) * 100)) : 0;
  const list = reports ?? [];

  // Helper to safely extract image property from stray report regardless of exact type definition key
  const getReportImage = (r: StrayReport & { imageUrl?: string; photo?: string }) => r.imageUrl || r.photo;

  return (
    <div className="container-page py-12">
      <h1 className="text-4xl font-bold">{t("dashTitle")}</h1>
      {loading ? <Spinner /> : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label={t("saved")} value={s.saved.toLocaleString()} icon={<HeartPulse />} />
            <StatCard label={t("rehomed")} value={s.rehomed.toLocaleString()} icon={<Home />} />
            <StatCard label={t("inCare")} value={s.inCare.toLocaleString()} icon={<PawPrint />} />
          </div>

          <section className="card mt-6 p-6">
            <h2 className="text-2xl font-bold">{t("fundTitle")}</h2>
            <div className="mt-4 h-4 overflow-hidden rounded-full bg-ink-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-golden-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span><b>{t("raised")}:</b> LKR {s.fundRaised.toLocaleString()}</span>
              <span><b>{t("goal")}:</b> LKR {s.fundGoal.toLocaleString()}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/donate" className="btn-primary">{t("donate")}</Link>
              <Link to="/adopt" className="btn-outline">{t("seeWaiting")}</Link>
            </div>
          </section>
        </>
      )}

      {user && list.length > 0 && (
        <>
          <h2 className="mb-4 mt-12 text-2xl font-bold">{user.role === "CITIZEN" ? t("myReports") : t("recentReports")}</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-left text-sm">
              <tbody>
                {list.map((r) => {
                  const img = getReportImage(r as any);
                  return (
                    <tr key={r._id} className="border-t border-ink-100 first:border-0">
                      <td className="p-4">
                        {img ? (
                          <img 
                            src={img} 
                            alt="Reported animal" 
                            className="h-12 w-12 rounded-lg object-cover shadow-sm" 
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink-100 text-xs text-ink-400">
                            No photo
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-bold">{r.species === "DOG" ? t("dog") : t("cat")}</td>
                      <td className="p-4">{r.location}</td>
                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${r.condition === "URGENT" ? "bg-ink-900 text-white" : "bg-golden-100 text-golden-700"}`}>
                          {r.condition}
                        </span>
                      </td>
                      <td className="p-4 font-semibold">{r.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}