import React from "react";
import ProductCard from "./ProductCard";
import ProductShimmer from "./ProductShimmer";

const ProductsContainer = ({ viewMode, productsList, error, isLoading }) => {
  if (error) return null;
  if (isLoading)
    return (
      <div className="flex-1 w-full">
        <ProductShimmer />
      </div>
    );
  if (productsList?.length == 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src="./emptyBox.png" alt="No products" />
        <h2 className="text-xl ">No Products Available</h2>
      </div>
    );
  }
  return (
    <div className="flex-1">
      <div
        className={`w-full mt-2 ${
          viewMode === "list"
            ? "flex flex-col gap-2 max-w-5xl mx-auto"
            : "grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {productsList &&
          productsList.map((item) => {
            return <ProductCard key={item?.id} data={item} mode={viewMode} />;
          })}
      </div>
    </div>
  );
};

export default ProductsContainer;
