import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/productFilterSlice";

const ProductContainerTitle = ({ viewMode, setViewMode, title }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex gap-4 items-center justify-between pb-2 flex-wrap">
      <h2 className="text-2xl">{title}</h2>
      <form
        className="h-8 flex w-min  group"
        onSubmit={(e) => {
          e.preventDefault();
          if (inputValue !== "") {
            dispatch(setSearchValue(inputValue));
            setInputValue("");
          }
        }}
      >
        <input
          type="text"
          placeholder="Search for the products"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="border border-gray-500/50 focus:outline-0 focus:border-white/70 px-2"
        />
        <button className=" bg-gray-500/50 px-2 text-sm">Search</button>
      </form>
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`${
            viewMode === "grid" ? "bg-gray-500" : "bg-gray-800"
          } px-3 flex items-center py-1 font-bold text-sm rounded-md cursor-pointer`}
        >
          Grid
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`${
            viewMode === "list" ? "bg-gray-500" : "bg-gray-800"
          } px-3 flex items-center py-1 font-bold text-sm rounded-md cursor-pointer`}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ProductContainerTitle;
