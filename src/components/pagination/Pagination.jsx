import React, { useEffect, useMemo, useState } from "react";
import useProductCategoriesApi from "../../hooks/useProductCategoriesApi";
import ProductShimmer from "../product/ProductShimmer";
import PaginationItem from "./PaginationItem";

const Pagination = ({
  itemPerPage = 6,
  isLoading,
  list,
  error,
  viewMode,
  component,
  emptyComponent,
}) => {
  useProductCategoriesApi();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(list.length / itemPerPage);
  }, [itemPerPage, list]);

  const currentPageData = useMemo(() => {
    if (!list) return [];
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return list.slice(startIndex, endIndex);
  }, [list, itemPerPage, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  if (error) return null;
  if (isLoading) return <ProductShimmer />;
  if (list.length === 0) return emptyComponent;
  return (
    <div aria-label="Pagination" className="w-full h-max flex-1">
      <div
        className={`w-full mt-2 ${
          viewMode === "list"
            ? "flex flex-col gap-2 max-w-5xl mx-auto"
            : "grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }`}
      >
        {currentPageData &&
          currentPageData.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {component ? component(item, viewMode) : null}
              </React.Fragment>
            );
          })}
      </div>
      <div className="w-full flex items-center justify-center mt-5 h-full">
        <PaginationItem
          totalPageCount={totalPages}
          currentActivePage={currentPage}
          setCurrentActivePage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
