import { useEffect, useState } from "react";

const useProductApi = (id) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Unable to fetch API");
        const json = await res.json();
        setProduct(json);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [id]);

  return { product, error, isLoading };
};
export default useProductApi;
