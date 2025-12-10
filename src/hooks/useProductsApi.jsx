import React, { useEffect, useState } from "react";
import { ALL_PRODUCTS_API } from "../utils/constants";

const useProductsApi = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    const fetchDetails = async () => {
      try {
        const res = await fetch(ALL_PRODUCTS_API, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("API Failed to Fetch");
        const json = await res.json();
        setProductsList(json.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
    return () => {
      controller.abort();
    };
  }, []);

  return { isLoading, error, productsList };
};

export default useProductsApi;
