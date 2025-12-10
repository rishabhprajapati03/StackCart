import React from "react";
import Products from "../components/product/Products";
import Carousel from "../components/carousel/Carousel";
const Home = () => {
  return (
    <div className="mx-auto max-w-[1500px] px-2 md:px-3 xl:px-4">
      <Carousel />
      <Products />
    </div>
  );
};

export default Home;
