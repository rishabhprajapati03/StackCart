import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const PaginationItem = ({
  totalPageCount,
  currentActivePage,
  setCurrentActivePage,
}) => {
  return (
    <div className="flex flex-wrap gap-2 w-auto font-semibold">
      <button
        aria-label="Previous page"
        aria-disabled={currentActivePage === 1}
        disabled={currentActivePage == 1}
        onClick={() => {
          setCurrentActivePage((prev) => prev - 1);
        }}
        className={`h-8 border  ${
          currentActivePage === 1 ? "bg-zinc-700" : "bg-zinc-800 cursor-pointer"
        } border-gray-500/50 pr-3 pl-1.5 flex items-center justify-center`}
      >
        <IoChevronBackOutline className="mr-1.5 text-xl" /> Prev
      </button>
      {totalPageCount &&
        Array.from({ length: totalPageCount }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={index}
              index={pageNumber}
              onClick={() => {
                setCurrentActivePage(pageNumber);
              }}
              className={`cursor-pointer border ${
                pageNumber === currentActivePage
                  ? "bg-zinc-900 border-white/70 "
                  : "bg-zinc-800 border-gray-500/50"
              } flex items-center justify-center  w-8 h-8  font-semibold`}
            >
              {pageNumber}
            </button>
          );
        })}
      <button
        disabled={currentActivePage == totalPageCount}
        onClick={() => {
          setCurrentActivePage((prev) => prev + 1);
        }}
        className={` h-8 border  ${
          currentActivePage === totalPageCount
            ? "bg-zinc-700"
            : "bg-zinc-800 cursor-pointer"
        } border-gray-500/50 pl-3 pr-1.5 flex items-center justify-center`}
      >
        Next <IoChevronForwardOutline className="ml-1.5 text-xl" />
      </button>
    </div>
  );
};

export default PaginationItem;
