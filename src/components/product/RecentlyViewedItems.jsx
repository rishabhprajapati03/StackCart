import React from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCart from "../buttons/AddToCart";
import { Link } from "react-router";
import ProductCard from "./ProductCard";

const RecentlyViewedItems = () => {
  const items = useSelector((store) => store.recentlyvieweditems.items);
  if (!items) return;

  return (
    <div className="w-full max-w-7xl grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-3 xl:gird-cols-6">
      {items.map((item) => {
        return <ProductCard key={item.id} data={item} mode="grid" />;
      })}
    </div>
  );
};

export default RecentlyViewedItems;
