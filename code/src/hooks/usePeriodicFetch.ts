import { useEffect, useState } from "react";

function usePeriodicFetch<T = any>(uri: string, intervalMs = 5000) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = () => {
      setLoading(true);
      setError(null);
      fetch(uri)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          return res.json();
        })
        .then(json => {
          if (!isCancelled) setData(json);
        })
        .catch(err => {
          if (!isCancelled) setError(err);
        })
        .finally(() => {
          if (!isCancelled) setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, intervalMs);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [uri, intervalMs]);

  return { data, loading, error };
}

export default usePeriodicFetch;
