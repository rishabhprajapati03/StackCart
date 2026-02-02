import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SkeletonCards from "../../../components/common/SkeletonCards";
import { useGetAllProductsQuery } from "../../../store/api/productsApi";
import { ApiErrorPayload } from "../../../store/types";
import { Product } from "../../../types";
import ProductCardContainer from "./ProductCardContainer";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Math.max(1, Number(searchParams.get("page")) || 1);

  const [items, setItems] = useState<Product[]>([]);

  const loaderDiv = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const { data, isLoading, isFetching, isError, error } =
    useGetAllProductsQuery({
      page: pageFromUrl,
      category: searchParams.get("category") ?? undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      size: searchParams.get("size") ?? undefined,
      search: searchParams.get("search") ?? undefined,
    });

  // setting data
  useEffect(() => {
    if (!data?.products) return;

    setItems((prev) => {
      if (pageFromUrl === 1) return data.products;

      const map = new Map(prev.map((p) => [p._id, p]));
      for (const product of data.products) {
        map.set(product._id, product);
      }
      return Array.from(map.values());
    });

    loadingRef.current = false;
  }, [data, pageFromUrl]);

  // reseting when filters applied or change
  useEffect(() => {
    setItems([]);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params);
  }, [
    searchParams.get("category"),
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
    searchParams.get("size"),
    searchParams.get("search"),
  ]);

  // Intersection observer
  useEffect(() => {
    if (!loaderDiv.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loadingRef.current &&
          !isFetching &&
          data?.pagination &&
          pageFromUrl < data.pagination.totalPages
        ) {
          loadingRef.current = true;

          const params = new URLSearchParams(searchParams);
          params.set("page", String(pageFromUrl + 1));
          setSearchParams(params);
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(loaderDiv.current);
    return () => observer.disconnect();
  }, [
    isFetching,
    pageFromUrl,
    data?.pagination,
    searchParams,
    setSearchParams,
  ]);

  // error mesage
  if (isError && error) {
    let message = "Something went wrong";

    if (isFetchBaseQueryError(error)) {
      const errData = error.data as ApiErrorPayload | undefined;
      message = errData?.message ?? "Request failed";
    }

    return <div>{message}</div>;
  }

  // wihslist logic

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      {items.map((product) => (
        <ProductCardContainer key={product._id} product={product} />
      ))}
      {(isLoading || isFetching) && <SkeletonCards />}
      {!isFetching && !isLoading && (
        <div ref={loaderDiv} className="h-4 col-span-2" />
      )}
    </div>
  );
};

export default Products;
