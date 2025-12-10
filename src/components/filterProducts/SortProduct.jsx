import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSortBy,
  selectProductFilter,
  setSortBy,
  setSortCurrentValue,
} from "../../redux/productFilterSlice";

const SortProduct = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectProductFilter);
  const sortOptions = [
    { name: "Default", value: "default" },
    { name: "Price (Low to High)", value: "price-asc" },
    { name: "Price (High to Low)", value: "price-desc" },
    { name: "Ratings", value: "rating" },
    { name: "Discount", value: "discount" },
  ];
  return (
    <div className="w-min md:w-full flex flex-col gap-2 ">
      <label htmlFor="sortBy" className="font-semibold shrink-0 mr-2">
        Sort By:
      </label>
      <select
        className="border flex-1 border-gray-500/50 px-3 py-2 bg-zinc-900 cursor-pointer font-semibold"
        id="sortBy"
        value={filter.sortCurrentValue}
        onChange={(e) => {
          dispatch(setSortCurrentValue(e.target.value));
          if (e.target.value === "default") {
            dispatch(removeSortBy());
            return;
          }
          dispatch(setSortBy(e.target.value));
        }}
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortProduct;
