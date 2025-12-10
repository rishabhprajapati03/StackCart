import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import { IoHeartDislikeOutline, IoHeartOutline } from "react-icons/io5";

const WishListBtn = ({ product }) => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((store) => store.wishlist.items);

  if (!product) return null;

  const isInWishList = wishListItems.some((item) => item.id === product.id);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isInWishList) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer  w-9 h-9 flex items-center justify-center bg-black/50 rounded-full text-base md:text-lg"
    >
      {isInWishList ? <IoHeartDislikeOutline /> : <IoHeartOutline />}
    </button>
  );
};

export default WishListBtn;
