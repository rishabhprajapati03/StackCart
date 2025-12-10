import React from "react";
import SortProduct from "./SortProduct";
import FilterChips from "./FilterChips";
import SortByCategory from "./SortByCategory";
import PriceFilter from "./PriceFilter";

const Filters = () => {
  return (
    <div className="md:w-4/12 lg:w-3/12 shrink-0 py-2 flex flex-wrap gap-2 md:flex-col">
      <FilterChips />
      <hr className="text-gray-500/50 mt-1.5 hidden md:flex" />
      <SortProduct />
      <hr className="text-gray-500/50 mt-1.5 hidden md:flex" />
      <SortByCategory />
      <hr className="text-gray-500/50 mt-1.5 hidden md:flex" />
      <PriceFilter />
    </div>
  );
};

export default Filters;
