import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductFilter,
  setPriceRange,
  setPriceRangeCurrentValue,
} from "../../redux/productFilterSlice";

const PriceFilter = () => {
  const filters = useSelector(selectProductFilter);
  const dispatch = useDispatch();
  const maxValue = 1000000000;
  const priceRangeList = [
    { value: 0, name: "Min" },
    { value: 50, name: "₹500" },
    { value: 100, name: "₹1000" },
    { value: 500, name: "₹5000" },
    { value: 1000, name: "₹10000" },
    { value: 2000, name: "₹20000" },
    { value: 3000, name: "₹30000" },
  ];
  const minOptions = priceRangeList.filter(
    (d) => d.value < filters.priceRangeCurrentValue.max
  );
  const maxOptions = [
    ...priceRangeList.filter(
      (d) => d.value > filters.priceRangeCurrentValue.min
    ),
    { value: maxValue, name: "₹30000+" },
  ];
  useEffect(() => {
    dispatch(
      setPriceRangeCurrentValue({
        min: filters.priceRangeCurrentValue.min,
        max: filters.priceRangeCurrentValue.max,
      })
    );
  }, [
    filters.priceRangeCurrentValue.min,
    filters.priceRangeCurrentValue.max,
    dispatch,
  ]);
  return (
    <div className=" flex flex-col gap-1 flex-wrap">
      <h2 className="">
        <b>Price:</b> (₹
        {filters.priceRangeCurrentValue.min * 10 +
          " - ₹" +
          (filters.priceRangeCurrentValue.max > 30000
            ? "30000+"
            : filters.priceRangeCurrentValue.max * 10)}
        )
      </h2>
      <div className="flex items-center w-min gap-2 mt-1">
        <select
          id="min-price"
          name="min-price"
          value={filters.priceRangeCurrentValue.min}
          onChange={(e) => {
            dispatch(
              setPriceRangeCurrentValue({ min: Number(e.target.value) })
            );
            dispatch(setPriceRange({ min: Number(e.target.value) }));
          }}
          className="bg-zinc-900 border border-gray-500/50 px-3 py-2  "
        >
          {minOptions.map((obj) => {
            return (
              <option key={obj.value} value={obj.value}>
                {obj.name}
              </option>
            );
          })}
        </select>
        <span>to</span>
        <select
          id="max-price"
          name="max-price"
          value={filters.priceRangeCurrentValue.max}
          onChange={(e) => {
            dispatch(
              setPriceRangeCurrentValue({ max: Number(e.target.value) })
            );
            dispatch(setPriceRange({ max: Number(e.target.value) }));
          }}
          className="bg-zinc-900 border border-gray-500/50 px-3 py-2"
        >
          {maxOptions.map((obj) => {
            return (
              <option key={obj.value} value={obj.value}>
                {obj.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default PriceFilter;
