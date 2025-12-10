import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import ImageGallery from "../components/imageGallery/ImageGallery";
import ProductDetails from "../components/product/ProductDetails";
import useProductApi from "../hooks/useProductApi";
import { useDispatch } from "react-redux";
import { addRecentlyViewedItem } from "../redux/recentlyViewedItemsSlice";
import RecentlyViewedItems from "../components/product/RecentlyViewedItems";
import AddToCart from "../components/buttons/AddToCart";

const Product = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const pid = searchParams.get("pid");
  const { product, isLoading, error } = useProductApi(pid);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) return;
    dispatch(addRecentlyViewedItem(product));
  }, [product, dispatch]);

  if (error) return <h2>{error.name}</h2>;

  if (isLoading)
    return (
      <h2 className="absolute z-10 top-1/2 left-1/2 -translate-1/2">
        Loading...
      </h2>
    );

  if (!product)
    return (
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-lg text-center flex flex-col items-center">
        Unfortunately the page you are looking for has been moved or deleted
        <Link
          to={`/`}
          className="bg-amber-600 px-3 py-1.5 text-white w-min whitespace-nowrap mt-4"
        >
          GO TO HOMEPAGE
        </Link>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full grid md:grid-cols-12 px-2 md:px-4 flex-wrap py-2">
        {/* Sticky image gallery */}
        <div className="col-span-12 md:col-span-5  md:top-14 md:sticky md:left-0 md:z-10 h-min">
          <ImageGallery images={product?.images} />
          <div className="w-full p-4 flex justify-center">
            {Product?.availabilityStatus === "In Stock" ? (
              <AddToCart product={product} />
            ) : null}
            {Product?.availabilityStatus === "In Stock" ? null : (
              <h2 className="border-b border-red-600 text-red-600 font-semibold w-min whitespace-nowrap mt-1">
                Out of Stock
              </h2>
            )}
          </div>
        </div>
        <ProductDetails info={product} />
      </div>
      <div className="w-full px-2 md:px-4  mt-4">
        <h2 className="text-xl font-semibold mt-2 mb-2">
          Recently Viewed Items
        </h2>
        <RecentlyViewedItems />
      </div>
    </div>
  );
};

export default Product;
