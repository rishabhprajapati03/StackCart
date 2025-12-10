import React from "react";

const ProductShimmerCard = () => {
  return (
    <div className="min-w-48 min-h-40 bg-stone-700 p-2">
      <div className="w-full aspect-square bg-stone-600"></div>
      <div className="w-full h-4 bg-stone-600"></div>
      <div className="w-full h-5 bg-stone-600"></div>
    </div>
  );
};

const ProductShimmer = () => {
  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      <ProductShimmerCard />
      <ProductShimmerCard />
      <ProductShimmerCard />
      <ProductShimmerCard />
      <ProductShimmerCard />
      <ProductShimmerCard />
      <ProductShimmerCard />
      <ProductShimmerCard />
      <ProductShimmerCard />
    </div>
  );
};

export default ProductShimmer;
