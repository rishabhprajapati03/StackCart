import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../store/api/wishlistApi";
import { useAppSelector } from "./redux";

const useWishlistActions = (productId: string) => {
  const { initialized, user } = useAppSelector((s) => s.auth);

  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    skip: !initialized || !user,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isWishlisted =
    wishlistData?.products?.some((p) => p._id === productId) ?? false;

  const toggleWishlist = async () => {
    if (isWishlisted) {
      await removeFromWishlist({ productId }).unwrap();
    } else {
      await addToWishlist({ productId }).unwrap();
    }
  };

  return { isWishlisted, toggleWishlist };
};

export default useWishlistActions;
