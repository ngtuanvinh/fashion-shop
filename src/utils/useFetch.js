import { useEffect, useState } from "react";

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "asos2.p.rapidapi.com",
  },
};

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        if (abortController.signal.aborted) {
          console.error("The user aborted the request");
        } else {
          console.error("The request failed");
        }
        setError(true);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [url]);
  return { data, isLoading, error };
};

export default useFetch;
