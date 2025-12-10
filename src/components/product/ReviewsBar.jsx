import React, { useMemo } from "react";
import { ratingsCount } from "../../utils/functions/ratingsCount";
import { IoMdStar } from "react-icons/io";

const ReviewsBar = ({ ratings }) => {
  const { averageRating, ratingList } = useMemo(() => {
    const avgRating =
      ratings.reduce((acc, item) => {
        return (acc = acc + item?.rating);
      }, 0) / ratings.length;

    const ratingsOnly = ratings?.map((r) => r.rating);
    const ratingObj = ratingsCount(ratingsOnly);
    const list = Object.values(ratingObj);

    return { averageRating: avgRating, ratingList: list };
  }, [ratings]);

  if (!ratings) return null;
  if (ratings.length === 0) return null;

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 pr-6 flex flex-col items-start justify-center  ">
        <div className="pl-2 text-2xl flex gap-1 items-center text-nowrap justify-center">
          {averageRating.toFixed(1)} <IoMdStar />
        </div>
        <p className="text-center text-nowrap text-sm font-semibold text-stone-300 leading-5">
          {ratings.length} Ratings <br /> & <br /> {ratings.length} Reviews
        </p>
      </div>

      {/* ratings bar */}
      <div className="col-span-9">
        <div className=" flex flex-col-reverse  gap-1">
          {ratingList.map((r, index) => {
            return (
              <div
                key={r?.value || index}
                className="flex items-center text-sm sm:text-xs gap-2"
              >
                <div className="flex items-center gap-0.5 font-semibold text-gray-300">
                  {r.value} <IoMdStar />
                </div>
                <div className="h-1.5 rounded-sm overflow-hidden min-w-36 w-full max-w-48 bg-stone-200">
                  <div
                    className={`h-full ${
                      r.value > 2 ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ width: `${r.percentage}%` }}
                  ></div>
                </div>
                <h2 className="">{r.count}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewsBar;
