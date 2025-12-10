import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/cartSlice";
import { HiMinus, HiPlus } from "react-icons/hi";
import toast from "react-hot-toast";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const cartData = useSelector((store) => store.cart);
  const productDetail = cartData?.items?.find((item) => item.id == product.id);
  const handleOnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItem(product));
    toast.success("Item Added");
  };
  const handleIncreament = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(increaseQuantity(product.id));
  };
  const handleDecrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(decreaseQuantity(product.id));
  };
  return (
    <>
      {productDetail?.quantity >= 1 ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="flex gap-1 items-center mt-1 bg-gray-300/80 w-min py-1 rounded-md px-2"
        >
          <button
            onClick={handleDecrement}
            className="cursor-pointer bg-gray-200 w-6 h-6 flex items-center justify-center text-black p-1.5 font-bold text-xl rounded-full hover:opacity-90 "
          >
            <HiMinus />
          </button>
          <p className="text-black font-semibold px-1.5">
            {productDetail?.quantity}
          </p>
          <button
            onClick={handleIncreament}
            className="cursor-pointer bg-gray-200 w-6 h-6 flex items-center justify-center text-black p-1.5 font-bold text-xl rounded-full hover:opacity-90 "
          >
            <HiPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleOnClick}
          className="cursor-pointer bg-amber-600 px-3 py-1.5 text-sm font-semibold rounded-md text-nowrap mt-1 w-min hover:opacity-90"
        >
          Add to Cart
        </button>
      )}
    </>
  );
};

export default AddToCart;
