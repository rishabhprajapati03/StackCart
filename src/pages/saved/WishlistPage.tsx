import { HeartIcon } from "lucide-react";
import EmptyStateUi from "../../components/common/EmptyStateUi";
import { useGetWishlistQuery } from "../../store/api/wishlistApi";
import { useAppSelector } from "../../hooks/redux";
import SkeletonCards from "../../components/common/SkeletonCards";
import ProductCardContainer from "../home/components/ProductCardContainer";

const WishlistPage = () => {
  const { initialized, user } = useAppSelector((s) => s.auth);
  const {
    data: wishlistData,
    isLoading,
    error,
    isError,
  } = useGetWishlistQuery(undefined, { skip: !initialized || !user });
  if (!initialized || !user) {
    return null;
  }
  if (isError) {
    console.log(error);
    return <h2>Failed to load Wishlist Items</h2>;
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        <SkeletonCards isSavedCard={true} />
      </div>
    );
  }
  if (wishlistData && wishlistData.products.length === 0) {
    return (
      <EmptyStateUi
        title={"No Saved Items!"}
        content={"You don’t have any saved items. Go to home and add some."}
        LabelIcon={HeartIcon}
      />
    );
  }
  const itemCount = wishlistData?.products?.length || 0;

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your wishlist?")) {
      console.log("Clear all logic goes here");
      // dispatch(clearWishlist());
    }
  };
  return (
    <div>
      <hr className="text-[#E6E6E6] mb-6" />
      <div className="flex justify-between items-center mb-5 px-1">
        <span className="font-semibold text-xl text-[#1A1A1A]">
          {itemCount} {itemCount === 1 ? "Item" : "Items"}
        </span>
        <button onClick={handleClearAll} className="text-sm underline ">
          Clear All
        </button>
      </div>

      <div className="gap-x-4 gap-y-5 grid grid-cols-2"></div>
      <div className="gap-x-4 gap-y-5 grid grid-cols-2">
        {wishlistData?.products.map((product) => (
          <ProductCardContainer
            key={product._id}
            product={product}
            isSavedCards={true}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
