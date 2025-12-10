import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCategory,
  removePriceRange,
  removeSearchValue,
  removeSortBy,
  selectProductFilter,
  setCategoryCurrentValue,
  setPriceRangeCurrentValue,
  setSearchValue,
  setSortCurrentValue,
} from "../../redux/productFilterSlice";
import { CgClose } from "react-icons/cg";

const FilterChip = ({ title, removeFilter, setFilter }) => {
  return (
    <div
      onClick={() => {
        removeFilter();
        setFilter();
      }}
      className="cursor-pointer px-3 py-1 border border-gray-500/50 bg-stone-800 rounded-full flex gap-1.5 items-center justify-center w-min whitespace-nowrap"
    >
      {title} <CgClose />
    </div>
  );
};

const FilterChips = () => {
  const filters = useSelector(selectProductFilter);
  const dispatch = useDispatch();
  const isPriceDefault =
    filters.filterChips.priceRangeValue.min === "₹0" &&
    filters.filterChips.priceRangeValue.max === "₹30000+";

  const clearAll = () => {
    dispatch(removeSortBy());
    dispatch(setSortCurrentValue("default"));

    dispatch(removeCategory());
    dispatch(setCategoryCurrentValue("all"));

    dispatch(removePriceRange());
    dispatch(setPriceRangeCurrentValue({ min: 0, max: 1000000000 }));

    dispatch(removeSearchValue());
    dispatch(setSearchValue(""));
  };

  const hasActiveChips =
    filters.filterChips.sortValue !== "" ||
    filters.filterChips.categoryValue !== "" ||
    !isPriceDefault ||
    filters.filterChips.searchValue !== "";
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-wrap w-full justify-between ">
        <h2 className="text-xl font-semibold ">Filters: </h2>
        {hasActiveChips && (
          <button
            onClick={clearAll}
            className="flex gap-1.5 bg-stone-800 border border-gray-500/50 whitespace-nowrap h-8 items-center justify-center px-2"
          >
            Clear All <CgClose />
          </button>
        )}
      </div>
      <div className=" flex flex-wrap gap-3">
        {filters.filterChips.sortValue != "" && (
          <FilterChip
            removeFilter={() => dispatch(removeSortBy())}
            setFilter={() => dispatch(setSortCurrentValue("default"))}
            title={filters.filterChips.sortValue}
          />
        )}
        {filters.filterChips.categoryValue != "" && (
          <FilterChip
            removeFilter={() => dispatch(removeCategory())}
            setFilter={() => dispatch(setCategoryCurrentValue("all"))}
            title={filters.filterChips.categoryValue}
          />
        )}
        {!isPriceDefault && (
          <FilterChip
            removeFilter={() => dispatch(removePriceRange())}
            setFilter={() =>
              dispatch(setPriceRangeCurrentValue({ min: 0, max: 1000000000 }))
            }
            title={
              filters.filterChips.priceRangeValue.min +
              "-" +
              filters.filterChips.priceRangeValue.max
            }
          />
        )}
        {filters.filterChips.searchValue != "" && (
          <FilterChip
            removeFilter={() => dispatch(removeSearchValue())}
            setFilter={() => dispatch(setSearchValue(""))}
            title={filters.filterChips.searchValue}
          />
        )}
      </div>
    </div>
  );
};

export default FilterChips;
