import React from "react";
import ReviewsBar from "./ReviewsBar";
import { IoMdStar } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const ProductReviews = ({ data, headingClass2 }) => {
  if (!data) return <h2> No Reviews available</h2>;
  if (data.length === 0) return null;
  return (
    <div className="border border-gray-500/50 mt-4">
      <h2 className={`${headingClass2}`}>Rating & Reviews</h2>
      <hr className="text-gray-500/50 w-full" />
      <div className="text-base text-stone-200 px-2 py-2 lg:px-3 lg:py-3">
        <ReviewsBar ratings={data} />
      </div>
      <hr className="text-gray-500/50 w-full" />
      <div className="text-base text-stone-200 px-2 py-2 lg:px-3 lg:py-3 flex flex-col gap-4">
        {data &&
          data.map((r, index) => {
            const reviewDate = new Date(r.date);
            return (
              <div key={index} className="w-full ">
                <div className="flex gap-0.5 items-center px-1.5 leading-4 py-[3px] rounded-xs bg-green-700 font-semibold w-min">
                  {r?.rating}
                  <IoMdStar />
                </div>
                <h2 className="w-full font-semibold mt-1.5">{r?.comment}</h2>
                <div className="text-sm text-gray-200 flex gap-2 items-center">
                  <h2 className=" font-semibold"> {r?.reviewerName}</h2>
                  <FaCheckCircle />
                  <h2 className="">{reviewDate.toDateString()}</h2>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductReviews;
