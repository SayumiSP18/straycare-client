// import { DependencyList, useEffect, useState } from "react";
// import { errorMessage } from "../service/api";
import { useEffect, useState } from "react";
import type { DependencyList } from "react";
import { errorMessage } from "../services/api";

export function useFetch<T>(fn: () => Promise<T>, deps: DependencyList = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fn()
      .then((d) => active && (setData(d), setError(null)))
      .catch((e) => active && setError(errorMessage(e)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
