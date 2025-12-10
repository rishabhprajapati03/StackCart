import React from "react";
import { useSelector } from "react-redux";

const CartTotal = () => {
  const cartData = useSelector((store) => store.cart);
  if (!cartData.items) return null;
  if (!cartData.total.totalAmount > 0) return null;
  return (
    <div className="md:p-2 md:bg-black/30">
      <h2 className="text-lg font-semibold uppercase text-gray-300">
        Price Details
      </h2>

      <hr className="text-gray-500/50 my-2" />

      <div className="flex flex-col gap-2 w-full">
        <div className="w-full flex gap-2 justify-between">
          <p>Price ({cartData.quantity} items)</p>
          <p>₹{cartData.total.totalPrice}</p>
        </div>
        <div className="w-full flex gap-2 justify-between">
          <p>Discount</p>
          <p className="text-green-600">- ₹{cartData.total.totalDiscount}</p>
        </div>
      </div>

      <hr className="text-gray-500/50 my-2" />

      <div className="w-full flex gap-2 justify-between font-semibold text-lg">
        <p>Total Amount</p>
        <p>₹{cartData.total.totalAmount}</p>
      </div>
    </div>
  );
};

export default CartTotal;
