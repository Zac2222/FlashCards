import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosRequestConfig, CanceledError } from "axios";

//copied from our game project, figured it works the same way here (made sure to study how it all actually works before use though)

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string,requestConfig?: AxiosRequestConfig, deps?: any) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsloading(true);

    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal,...requestConfig })
      .then((response) => {
        setData(response.data.results);
        setIsloading(false);
      })

      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsloading(false);
      });

    return () => controller.abort();
  },deps?[...deps]:[]);

  return { data, error, isloading };
};

export default useData;