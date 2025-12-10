import React, { useMemo, useState } from "react";
import useProductsApi from "../../hooks/useProductsApi";
import ProductContainerTitle from "./ProductContainerTitle";
import Filters from "../filterProducts/Filters";
import { useSelector } from "react-redux";
import { selectProductFilter } from "../../redux/productFilterSlice";
import { productFilter } from "../../utils/functions/productFilter";
import Pagination from "../pagination/Pagination";
import ProductCard from "./ProductCard";

const Products = ({ title = "Products For You" }) => {
  const { isLoading, error, productsList } = useProductsApi();
  const [mode, setMode] = useState("grid");
  const filters = useSelector(selectProductFilter);
  const filteredProducts = useMemo(
    () => productFilter(productsList, filters),
    [productsList, filters]
  );
  return (
    <div className="mx-auto mt-4 lg:mt-6">
      <ProductContainerTitle
        viewMode={mode}
        setViewMode={setMode}
        title={title}
      />
      <div className="flex flex-col md:flex-row flex-wrap gap-3 w-full">
        <Filters />
        <Pagination
          itemPerPage={20}
          viewMode={mode}
          component={(product, viewMode) => (
            <ProductCard data={product} mode={viewMode} />
          )}
          emptyComponent={
            <div className="flex-1 flex flex-col items-center justify-center">
              <img src="./emptyBox.png" alt="No products" />
              <h2 className="text-xl ">No Products Available</h2>
            </div>
          }
          isLoading={isLoading}
          list={filteredProducts}
          error={error}
        ></Pagination>
      </div>
    </div>
  );
};

export default Products;
