import React from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { removeItem } from "../../redux/cartSlice";
import AddToCart from "../buttons/AddToCart";
import toast from "react-hot-toast";

const CartItems = () => {
  const cartData = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  if (!cartData.items.length > 0) return null;
  return (
    <div className="flex gap-4 flex-col-reverse md:bg-black/30 md:p-2">
      {cartData.items.map((item) => {
        const { id, thumbnail, title, rating, price, discountPercentage } =
          item;

        const roundedPrice = Math.ceil(price);
        const discountPrice = Math.ceil(
          (roundedPrice -
            (roundedPrice * Math.ceil(discountPercentage)) / 100) *
            10
        );
        const linkAddress = title.replaceAll(" ", "-");
        return (
          <div key={item?.id} className="">
            <div className="flex flex-row overflow-hidden ">
              <Link
                key={id}
                to={`/${linkAddress}`}
                className={`w-4/12 sm:w-4/12 md:w-3/12 lg:w-3/12 `}
                state={item}
              >
                <img
                  src={thumbnail}
                  alt={title}
                  className={` aspect-14/10 object-contain rounded-md border border-gray-400/30`}
                  onError={(e) => (e.target.src = "./fallbackImage.png")}
                />
              </Link>

              <div className={`px-2 md:px-3`}>
                <Link
                  key={id}
                  to={`/${linkAddress}`}
                  className={``}
                  state={item}
                >
                  <h2 className="text-base line-clamp-2 leading-5 hover:text-sky-400">
                    {title}
                  </h2>
                </Link>
                <div className="flex items-center flex-wrap">
                  <h2 className="text-lg font-semibold pr-2">
                    ₹{discountPrice}
                  </h2>
                  <h2 className="text-sm line-through text-gray-200 pr-2">
                    ₹{Math.ceil(roundedPrice * 10)}
                  </h2>
                  <h2 className="text-green-600 font-semibold text-sm pr-2">
                    {discountPercentage &&
                      Math.ceil(discountPercentage) + "% off"}
                  </h2>
                </div>
                <div className="flex gap-1 text-sm items-center text-amber-500">
                  <FaStar /> {rating}
                </div>
              </div>
            </div>
            <div className="flex gap-6 ">
              <AddToCart product={item} />
              <button
                onClick={() => {
                  dispatch(removeItem(item.id));
                  toast.success("Item Removed");
                }}
                className="text-gray-300 font-semibold text-base uppercase"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
