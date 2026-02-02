import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  image: string;
  title: string;
  id: string;
  price: number;
  isSavedCard?: boolean;
  isInWishlist: boolean;
  onFavoriteClick: () => void;
  onClick?: () => void;
}

const ProductCard = ({
  image,
  title,
  price,
  id,
  isSavedCard = false,
  isInWishlist,
  onFavoriteClick,
}: ProductCardProps) => {
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onFavoriteClick();
  };

  return (
    <Link
      to={`/product/${id}`}
      className="rounded-[10px] group flex flex-col gap-2 w-full cursor-pointer max-w-80 md:max-w-sm"
    >
      <div
        className={`relative ${
          isSavedCard ? "aspect-4/3" : "aspect-3/4"
        } w-full overflow-hidden rounded-[10px] bg-[#E6E6E6]`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/productPlaceholder.png";
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow hover:scale-105 transition"
        >
          <Heart
            size={18}
            className={
              isInWishlist
                ? "fill-[#ED1010] stroke-[#ED1010]"
                : "fill-none stroke-black"
            }
          />
        </button>
      </div>

      <div className="flex flex-col gap-0.5 px-1">
        <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] tracking-tight leading-tight line-clamp-1">
          {title}
        </h3>
        <p className="text-sm font-medium text-[#808080]">$ {price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
