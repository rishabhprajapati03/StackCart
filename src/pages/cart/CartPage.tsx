import { ArrowRight, ShoppingCart } from "lucide-react";
import EmptyStateUi from "../../components/common/EmptyStateUi";
import CartItemComponent from "../../components/common/CartItemComponent";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import {
  useClearCartMutation,
  useDeleteCartItemMutation,
  useGetCartQuery,
  useUpdateCartItemQuantityMutation,
} from "../../store/api/cartApi";
import { useAppSelector } from "../../hooks/redux";
import type { CartItem, Size } from "../../types";
import CalculationSummary from "./Summary/CalculationSummary";
import { useState } from "react";
import CartSkeleton from "./components/CartSkeleton";
import { showDestructiveAlert } from "../../components/ui/Alerts";

const CartPage = () => {
  const [updatingItemKey, setUpdatingItemKey] = useState<string | null>(null);
  const [removingItemKey, setRemovingItemKey] = useState<string | null>(null);

  const { initialized, user } = useAppSelector((s) => s.auth);
  const {
    data: cart,
    isLoading: cartLoading,
    error,
    isError,
  } = useGetCartQuery(undefined, {
    skip: !initialized || !user,
  });
  const [updateCartItemQuantity, { isLoading: isUpdatingCart }] =
    useUpdateCartItemQuantityMutation();
  const [deleteCartItem, { isLoading: isDeleting }] =
    useDeleteCartItemMutation();
  const [clearCart, { isLoading: isClearingCart }] = useClearCartMutation();
  console.log(cart);
  if (cartLoading) return <CartSkeleton />;
  if (cart?.items.length === 0) {
    return (
      <EmptyStateUi
        title="Your Cart is Empty!"
        content="When you add products, they’ll appear here."
        LabelIcon={ShoppingCart}
      />
    );
  }
  const itemCount = cart?.items?.length || 0;

  const getItemKey = (productId: string, size: Size) => `${productId}_${size}`;

  const handleClearCart = () => {
    showDestructiveAlert({
      title: "Clear Cart?",
      message:
        "Are you sure you want to remove all items? This action cannot be undone.",
      confirmText: "Yes, Clear All",
      cancelText: "No, Keep Them",
      onConfirm: async () => {
        await clearCart().unwrap();
      },
    });
  };

  const isAnyMutationLoading = isUpdatingCart || isDeleting || isClearingCart;

  return (
    <>
      {isAnyMutationLoading && (
        <div
          className="fixed inset-0 z-40 bg-[#E6E6E6]/40 
               flex items-center justify-center
               pointer-events-none"
        >
          <div
            className="w-6 h-6 border-2 border-gray-400
                    border-t-transparent rounded-full animate-spin"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between pb-5 ">
        <div className="mb-6 space-y-6">
          <div className="flex justify-between items-center mb-5 px-1">
            <span className="font-semibold text-xl text-[#1A1A1A]">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </span>
            <button onClick={handleClearCart} className="text-sm underline ">
              Clear All
            </button>
          </div>
          <div className="space-y-3.5 ">
            {cart &&
              cart?.items.map((item: CartItem) => {
                const { _id, name, price, images, sizes } = item.product || {};
                const itemPrice = price / 100;
                const stock =
                  sizes?.find((s) => s.size === item.size)?.stock ?? 0;

                console.log(stock);
                const itemKey = getItemKey(_id, item.size);
                return (
                  <CartItemComponent
                    key={_id + item.size}
                    image={images[0]}
                    stock={stock}
                    title={name}
                    isUpdating={updatingItemKey === itemKey}
                    isRemoving={removingItemKey === itemKey}
                    size={item.size}
                    price={`${itemPrice}`}
                    quantity={item.quantity}
                    onUpdateQuantity={async (newQty: number) => {
                      const key = getItemKey(_id, item.size);
                      setUpdatingItemKey(key);

                      try {
                        await updateCartItemQuantity({
                          productId: _id,
                          size: item.size,
                          quantity: newQty,
                        }).unwrap();
                      } catch (err) {
                        console.error("Failed to Update Cart", err);
                      } finally {
                        setUpdatingItemKey(null);
                      }
                    }}
                    onRemove={async () => {
                      const key = getItemKey(_id, item.size);
                      setRemovingItemKey(key);

                      try {
                        await deleteCartItem({
                          productId: _id,
                          size: item.size,
                        }).unwrap();
                      } catch (err) {
                        console.error("Failed to Remove Item", err);
                      } finally {
                        setRemovingItemKey(null);
                      }
                    }}
                  />
                );
              })}
          </div>
          {cart?.items && <CalculationSummary items={cart.items} />}
        </div>
        <Link to={"/checkout"}>
          <Button LeftIcon={<ArrowRight />}>Go To Checkout</Button>
        </Link>
      </div>
    </>
  );
};

export default CartPage;
