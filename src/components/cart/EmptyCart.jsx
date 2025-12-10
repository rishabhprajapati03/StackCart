import React from "react";
import { Link } from "react-router";

const EmptyCart = () => {
  return (
    <div className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <h2 className="text-lg mb-4 tracking-wide">Your Cart is Empty</h2>
      <Link
        to={"/"}
        className="px-3 py-2 rounded-md font-bold bg-gray-300 text-black hover:opacity-90"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
