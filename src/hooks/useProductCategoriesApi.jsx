import React, { useEffect } from "react";
import { ALL_PRODUCTS_CATEGORIES_API } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductCategories,
  setCategories,
  setError,
  setisLoading,
} from "../redux/productCategoriesSlice";

const useProductCategoriesApi = () => {
  const dispatch = useDispatch();
  const { categories, error, isLoading } = useSelector(selectProductCategories);

  useEffect(() => {
    if (categories.length > 0) return;

    dispatch(setError(null));
    dispatch(setisLoading(true));

    const controller = new AbortController();
    const fetchDetails = async () => {
      try {
        const res = await fetch(ALL_PRODUCTS_CATEGORIES_API, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("API Failed to Fetch");
        const json = await res.json();
        dispatch(setCategories(json));
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch(setError(err.message));
        }
      } finally {
        dispatch(setisLoading(false));
      }
    };
    fetchDetails();
    return () => {
      controller.abort();
    };
  }, [dispatch, categories.length]);
  return { error, categories, isLoading };
};

export default useProductCategoriesApi;
