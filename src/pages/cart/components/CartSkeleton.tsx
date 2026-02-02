const CartSkeletonCard = () => {
  return (
    <div className="flex items-stretch gap-4 py-3.5 px-3.75 bg-white border border-[#E6E6E6] rounded-[10px] w-full max-w-2xl animate-pulse">
      {/* Product Image Skeleton */}
      <div className="w-20.75 h-19.75 sm:w-25.5 sm:h-24 shrink-0 bg-[#CCCCCC] rounded-sm" />

      {/* Info Skeleton */}
      <div className="flex flex-col justify-between flex-1 gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            {/* Title */}
            <div className="h-5 w-40 sm:w-56 bg-[#CCCCCC] rounded-md" />
            {/* Size */}
            <div className="h-4 w-16 bg-[#CCCCCC] rounded-md" />
          </div>

          {/* Delete Icon */}
          <div className="w-5 h-5 bg-[#CCCCCC] rounded-full" />
        </div>

        <div className="flex justify-between items-end">
          {/* Price */}
          <div className="h-6 w-20 bg-[#CCCCCC] rounded-md" />

          {/* Quantity Selector Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#CCCCCC] rounded-[3px]" />
            <div className="w-4 h-6 bg-[#CCCCCC] rounded-md" />
            <div className="w-6 h-6 bg-[#CCCCCC] rounded-[3px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col gap-3.5">
      {/* Mocking 3 items as seen in your screenshot */}
      <CartSkeletonCard />
      <CartSkeletonCard />
      <CartSkeletonCard />

      {/* Optional: Summary Skeleton */}
      <div className="mt-6 pt-4 border-t border-[#E6E6E6] space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-[#CCCCCC] rounded" />{" "}
          <div className="h-4 w-16 bg-[#CCCCCC] rounded" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-[#CCCCCC] rounded" />{" "}
          <div className="h-4 w-16 bg-[#CCCCCC] rounded" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-6 w-24 bg-[#CCCCCC] rounded" />{" "}
          <div className="h-6 w-20 bg-[#CCCCCC] rounded" />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
