import React from "react";
import CartItems from "../components/cart/CartItems";
import { useDispatch, useSelector } from "react-redux";
import CartTotal from "../components/cart/CartTotal";
import { clearCart } from "../redux/cartSlice";
import EmptyCart from "../components/cart/EmptyCart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Cart = () => {
  const cartData = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (cartData.items.length == 0) return <EmptyCart />;
  const handleOrderPlace = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2 px-2">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-8">
          <div className="md:px-2 my-2 flex gap-3 justify-between items-center w-full">
            <h2 className="text-xl font-semibold">Cart</h2>
            <button
              onClick={() => {
                dispatch(clearCart());
                toast.success("Cart Cleared");
              }}
              className="font-semibold text-gray-200"
            >
              Remove All
            </button>
          </div>
          <CartItems />
        </div>
        <div className="md:sticky md:top-16 col-span-12 md:col-span-4 h-min">
          <CartTotal />
          <button
            onClick={() => {
              toast.success("Order Placed");
              setTimeout(() => handleOrderPlace(), 2000);
            }}
            className="w-min cursor-pointer px-4 py-1.5 text-lg font-semibold uppercase bg-orange-600 text-nowrap mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
