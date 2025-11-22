import { useEffect, useState } from "react";

export interface ChartDataPoint {
  date: string;
  desktop: number;
  mobile: number;
}

interface Cache {
  data: ChartDataPoint[] | null;
  promise: Promise<ChartDataPoint[]> | null;
  error: unknown;
}

const cache: Cache = {
  data: null,
  promise: null,
  error: null,
};

export function useSharedChartData() {
  const [data, setData] = useState<ChartDataPoint[] | null>(cache.data);
  const [isLoading, setIsLoading] = useState(!cache.data);
  const [error, setError] = useState<unknown>(cache.error);

  useEffect(() => {
    if (cache.data) {
      // Already have data, no need to fetch again
      setData(cache.data);
      setIsLoading(false);
      return;
    }

    if (!cache.promise) {
      cache.promise = fetch("/api/chart-data")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch chart data");
          }
          return response.json();
        })
        .then((json) => {
          cache.data = json;
          return json;
        })
        .catch((err) => {
          cache.error = err;
          throw err;
        });
    }

    cache.promise
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}
