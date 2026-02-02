import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface CartItemComponentProps {
  image: string;
  title: string;
  size: string;
  price: string;
  isUpdating: boolean;
  isRemoving: boolean;
  stock: number;
  quantity: number;
  onUpdateQuantity: (newQty: number) => void;
  onRemove: () => void;
}

const CartItemComponent = ({
  image,
  title,
  size,
  stock,
  price,
  quantity,
  isUpdating,
  isRemoving,
  onUpdateQuantity,
  onRemove,
}: CartItemComponentProps) => {
  const isBusy = isUpdating || isRemoving;

  return (
    <div className="flex items-stretch gap-4 py-3.5 px-3.75 bg-white border border-gray-100 rounded-[10px] w-full max-w-2xl">
      {/* Product Image */}
      <div className="w-20.75 h-19.75 sm:w-25.5 sm:h-24 shrink-0 overflow-hidden rounded-sm bg-gray-50">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* INfo */}
      <div className="flex flex-col justify-between flex-1 gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-black leading-tight line-clamp-1">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-[#808080]">Size {size}</p>
          </div>

          {/* Delete Button */}
          <button
            disabled={isBusy}
            onClick={onRemove}
            className="p-0.5 disabled:opacity-50"
          >
            {isRemoving ? (
              <div
                className="w-4 h-4 border-2 border-red-500
                    border-t-transparent rounded-full animate-spin"
              />
            ) : (
              <Trash2 className="w-4 h-4 stroke-[#ED1010]" />
            )}
          </button>
        </div>
        <div className="flex justify-between items-end">
          {/* Price */}
          <span className="text-base sm:text-lg font-semibold text-black">
            $ {price}
          </span>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <button
              disabled={isBusy || quantity <= 1}
              onClick={() => onUpdateQuantity(quantity - 1)}
              className="w-6 h-6 flex items-center justify-center
             border border-[#CCCCCC] rounded-[3px]
             disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="text-base sm:text-lg font-medium w-4 text-center">
              {quantity}
            </span>

            <button
              disabled={isBusy}
              onClick={() => {
                if (quantity < stock) {
                  onUpdateQuantity(quantity + 1);
                  console.log(stock);
                } else {
                  toast.error(`Only ${stock} items available in stock.`);
                }
              }}
              className="w-6 h-6 flex items-center justify-center
             border border-[#CCCCCC] rounded-[3px]
             disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
