const SearchSkeletonCard = () => {
  return (
    <div className="flex items-stretch justify-between gap-4 animate-pulse  ">
      <div className=" shrink-0  flex gap-3">
        <div className="w-14 h-13.25  bg-[#CCCCCC] overflow-hidden rounded-md" />
        <div className="flex flex-col gap-1 justify-around py-1">
          <div className="bg-[#CCCCCC] text-base h-5.5 w-44 rounded-md leading-tight line-clamp-1"></div>
          <div className="bg-[#CCCCCC] text-xs h-4.5 w-20 rounded-md"></div>
        </div>
      </div>

      <div className="bg-[#CCCCCC] shrink-0 w-6 h-6 flex rounded-md items-center"></div>
    </div>
  );
};

const SearchSkeletonCards = () => {
  return (
    <div className="space-y-4">
      <SearchSkeletonCard />
      <hr className="text-[#E6E6E6]" />
      <SearchSkeletonCard />
      <hr className="text-[#E6E6E6]" />
      <SearchSkeletonCard />
      <hr className="text-[#E6E6E6]" />
      <SearchSkeletonCard />
      <hr className="text-[#E6E6E6]" />
      <SearchSkeletonCard />
      <hr className="text-[#E6E6E6]" />
      <SearchSkeletonCard />
      <hr className="text-[#E6E6E6]" />
      <SearchSkeletonCard />
    </div>
  );
};

export default SearchSkeletonCards;
