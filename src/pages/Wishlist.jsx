import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import WishListBtn from "../components/buttons/WishListBtn";
import ProductCard from "../components/product/ProductCard";
import { clearWishlist } from "../redux/wishlistSlice";
import toast from "react-hot-toast";

const Wishlist = () => {
  const wishlistItems = useSelector((store) => store.wishlist.items);
  const dispatch = useDispatch();
  if (wishlistItems.length === 0)
    return (
      <div className="my-2 p-2 md:p-4 max-w-5xl mx-auto text-2xl ">
        Your WishList is empty
      </div>
    );
  return (
    <div className="px-2 md:px-4 py-2 max-w-5xl mx-auto">
      <div className="flex items-center justify-between my-2">
        <h2 className="font-semibold text-xl  ">WishList</h2>
        <button
          onClick={() => {
            dispatch(clearWishlist());
            toast.success("Wishlist Cleared");
          }}
          className="font-semibold bg-gray-300/50 px-3 py-1 rounded-md"
        >
          Clear Wishlist
        </button>
      </div>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {wishlistItems.map((item) => {
          return <ProductCard key={item.id} data={item} mode="grid" />;
        })}
      </div>
    </div>
  );
};

export default Wishlist;
