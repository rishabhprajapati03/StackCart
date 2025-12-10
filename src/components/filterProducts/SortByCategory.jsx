import React from "react";
import useProductCategoriesApi from "../../hooks/useProductCategoriesApi";
import { useDispatch, useSelector } from "react-redux";
import { selectProductCategories } from "../../redux/productCategoriesSlice";
import {
  removeCategory,
  selectProductFilter,
  setCategory,
  setCategoryCurrentValue,
} from "../../redux/productFilterSlice";

const SortByCategory = () => {
  useProductCategoriesApi();
  const dispatch = useDispatch();
  const { error, categories } = useSelector(selectProductCategories);
  const filters = useSelector(selectProductFilter);
  if (error) return null;
  if (!categories.length) return null;
  return (
    <div className="flex flex-col w-min md:w-full  gap-2">
      <label className="shrink-0 font-semibold" htmlFor="category">
        Category:
      </label>
      <select
        name="category"
        value={filters.categoryCurrentValue}
        onChange={(e) => {
          dispatch(setCategoryCurrentValue(e.target.value));
          if (e.target.value == "all") {
            dispatch(removeCategory());
            return;
          }
          dispatch(setCategory(e.target.value));
        }}
        className="flex-1 grow-0 bg-zinc-900 border border-gray-500/50 px-3 py-2 font-semibold"
      >
        {categories.map((category) => {
          return (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortByCategory;
