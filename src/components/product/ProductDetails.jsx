import React from "react";
import { FaStar } from "react-icons/fa";
import ProductReviews from "./ProductReviews";
import ProductQaA from "./ProductQaA";

const ProductDetails = ({ info }) => {
  const {
    title,
    discountPercentage,
    price,
    rating,
    reviews,
    shippingInformation,
    dimensions,
    description,
    warrantyInformation,
  } = info;
  const discountPrice = (
    (price - (price * Math.ceil(discountPercentage)) / 100) *
    10
  ).toFixed(2);

  const headingClass2 =
    "text-xl font-semibold px-2 py-2 lg:px-3 lg:py-3 xl:px-4 xl:py-4";
  return (
    <div className="col-span-7 mb-1 md:px-4 lg:px-8 ">
      <h2 className="text-xl lg:text-2xl">{title}</h2>
      <div className="flex gap-1 items-center mt-2">
        <div className="flex gap-1 text-base items-center bg-green-500 rounded-full pl-2.5 pr-2 font-semibold py-0.5">
          {rating} <FaStar className="text-sm" />
        </div>
        <div className="flex gap-1 text-base items-center text-gray-300 font-semibold">
          {reviews?.length} Ratings & {reviews?.length} Reviews
        </div>
      </div>
      <div className="flex items-center flex-wrap mt-3">
        <h2 className="text-2xl lg:text-3xl font-semibold pr-2">
          ₹{discountPrice}
        </h2>
        <h2 className="text-[16px] lg:text-[18px] line-through text-gray-300 pr-2">
          ₹{(price * 10).toFixed(2)}
        </h2>
        <h2 className="text-green-400 text-lg lg:text-xl font-semibold pr-2">
          {discountPercentage && Math.ceil(discountPercentage) + "% off"}
        </h2>
      </div>
      <h2 className="text-gray-200 mt-1 text-sm lg:text-base">
        {shippingInformation}
      </h2>

      {description && (
        <div className="border border-gray-500/50 mt-4">
          <h2 className={`${headingClass2}`}>Product Description</h2>
          <hr className="text-gray-500/50 w-full" />
          <p className="text-base text-stone-200 px-2 py-2 lg:px-3 lg:py-3">
            {description}
          </p>
        </div>
      )}
      {dimensions && (
        <div className="border border-gray-500/50 mt-4">
          <h2 className={`${headingClass2}`}>Specifications</h2>
          <hr className="text-gray-500/50 w-full" />
          <div className=" ">
            <div className="px-2 py-2 lg:px-3 lg:py-3">
              <h2 className="text-lg mb-2 lg:mb-3">Warranty</h2>
              <p className="text-base text-stone-200">{warrantyInformation}</p>
            </div>

            <hr className="text-gray-500/50 w-full" />

            <div className="px-2 py-2 lg:px-3 lg:py-3">
              <h2 className="text-lg mb-2 lg:mb-3">Dimensions</h2>
              <table className="text-sm w-full">
                <tbody className="text-sm w-full flex flex-col gap-2 lg:gap-3">
                  <tr className="w-full flex flex-wrap">
                    <th className="font-semibold w-4/12 text-start pr-2 shrink-0">
                      Height
                    </th>
                    <td className="text-stone-200 flex-1">
                      {dimensions?.height}cm
                    </td>
                  </tr>
                  <tr className="w-full flex flex-wrap">
                    <th className="font-semibold w-4/12 text-start pr-2 shrink-0">
                      Width
                    </th>
                    <td className="text-stone-200 flex-1">
                      {dimensions?.width}cm
                    </td>
                  </tr>
                  <tr className="w-full flex flex-wrap">
                    <th className="font-semibold w-4/12 text-start pr-2 shrink-0">
                      Depth
                    </th>
                    <td className="text-stone-200 flex-1">
                      {dimensions?.depth}cm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* product Reviews */}
      <ProductReviews data={reviews} headingClass2={headingClass2} />
      <ProductQaA />
    </div>
  );
};

export default ProductDetails;
