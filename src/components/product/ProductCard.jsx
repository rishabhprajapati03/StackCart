import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import AddToCart from "../buttons/AddToCart";
import WishListBtn from "../buttons/WishListBtn";

const ProductCard = ({ data, mode = "grid" }) => {
  if (!data) return;
  const {
    id,
    thumbnail,
    title,
    rating,
    price,
    discountPercentage,
    availabilityStatus,
  } = data;
  const discountPrice = Math.ceil(
    (price - (price * Math.ceil(discountPercentage)) / 100) * 10
  );
  const linkAddress = title.replaceAll(" ", "-");
  return (
    <Link
      to={`/${linkAddress}?pid=${id}`}
      className={`flex ${
        mode === "list" ? "flex-row p-1.5" : "flex-col"
      }  border border-gray-500/50 rounded-lg overflow-hidden hover:scale-[98%] transition-all duration-200`}
    >
      <div
        className={`${
          mode === "list"
            ? "w-4/12 sm:w-5/12 md:w-4/12 aspect-14/10 "
            : "w-full aspect-square"
        }  bg-stone-950/70 rounded-md flex shrink-0 items-center justify-center relative`}
      >
        <img
          src={thumbnail}
          alt={title}
          className={`object-contain h-full rounded-md`}
          onError={(e) => (e.target.src = "./fallbackImage.png")}
        />
        <div className="absolute z-20 top-0 right-0 m-1 md:m-2">
          <WishListBtn product={data} />
        </div>
      </div>
      <div className={`${mode === "list" ? "px-2 md:px-3" : "p-1.5 mb-1"}`}>
        <h2 className="text-base line-clamp-2 leading-5">{title}</h2>
        <div className="flex items-center flex-wrap">
          <h2 className="text-lg font-semibold pr-2">₹{discountPrice}</h2>
          <h2 className="text-sm line-through text-gray-200 pr-2">
            ₹{Math.ceil(price * 10)}
          </h2>
          <h2 className="text-green-600 font-semibold text-sm pr-2">
            {discountPercentage && Math.floor(discountPercentage) + "% off"}
          </h2>
        </div>
        <div className="flex gap-1 text-sm items-center text-amber-500">
          <FaStar /> {rating}
        </div>
        {availabilityStatus === "In Stock" ? (
          <AddToCart product={data} />
        ) : null}
        {availabilityStatus === "In Stock" ? null : (
          <h2 className="border-b border-red-600 text-red-600 font-semibold w-min whitespace-nowrap mt-1">
            Out of Stock
          </h2>
        )}
      </div>
    </Link>
  );
};
export default ProductCard;
