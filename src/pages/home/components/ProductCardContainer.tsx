import ProductCard from "../../../components/common/ProductCard";
import useWishlistActions from "../../../hooks/useWishlistActions";
import { Product } from "../../../types";

type Props = {
  product: Product;
  isSavedCards?: boolean;
};

const ProductCardContainer = ({ isSavedCards = false, product }: Props) => {
  const { isWishlisted, toggleWishlist } = useWishlistActions(product._id);

  return (
    <ProductCard
      id={product._id}
      image={product.images[0]}
      title={product.name}
      price={product.price / 100}
      isInWishlist={isWishlisted}
      isSavedCard={isSavedCards}
      onFavoriteClick={toggleWishlist}
    />
  );
};

export default ProductCardContainer;
