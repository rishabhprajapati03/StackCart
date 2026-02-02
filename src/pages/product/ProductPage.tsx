import ProductHeader from "./components/ProductHeader";
import ProductReviewsDrawer from "./components/ProductReviewsDrawer";
import ProductDetails from "./components/ProductDetails";
import { useGetProductByIdQuery } from "../../store/api/productsApi";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, ShoppingBag } from "lucide-react";
import { useAddToCartMutation, useGetCartQuery } from "../../store/api/cartApi";
import { CartItem, Size } from "../../types";
import Button from "../../components/ui/Button";
import { useAppSelector } from "../../hooks/redux";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const { initialized, user } = useAppSelector((s) => s.auth);
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  if (!id) return null;
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(id);

  const { data: cartData } = useGetCartQuery(undefined, {
    skip: (!product && !initialized) || !user,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<Size>();
  const isSizeSelected = selectedSize !== undefined;

  const isInCart = !!cartData?.items.find(
    (item: CartItem) =>
      item.product._id === product?._id && item.size === selectedSize,
  );

  if (!id) return <h2>Go Back</h2>;

  useEffect(() => {
    if (product?.sizes.length === 1) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product]);

  return (
    <div className="relative bg-white">
      <ProductHeader />
      <ProductReviewsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      {isLoading && <h2>Loading product details...</h2>}

      {isError && (
        <>
          {console.log(error)}
          <h2 className="px-5 py-6 text-lg font-semibold ">
            Error in Fetching Product Details
          </h2>
        </>
      )}

      {!isLoading && !isError && product && (
        <>
          <ProductDetails
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            setIsDrawerOpen={setIsDrawerOpen}
            data={product}
          />
          <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E6E6E6] p-5 flex items-center justify-between z-40">
            {" "}
            <div className="flex flex-col shrink-0 w-1/3">
              {" "}
              <span className="text-[#808080] text-sm">Price</span>{" "}
              <span className="text-2xl font-bold text-black">
                {" "}
                ₹ {product.price / 100}{" "}
              </span>{" "}
            </div>{" "}
            {isInCart ? (
              <Link to="/cart" className="w-full">
                <Button variant="secondary">
                  <ShoppingBag size={20} /> Go To Cart
                </Button>
              </Link>
            ) : (
              <Button
                disabled={!isSizeSelected || isAddingToCart}
                onClick={async () => {
                  if (!selectedSize) return;

                  try {
                    await addToCart({
                      productId: product._id,
                      size: selectedSize,
                      quantity: 1,
                    }).unwrap();
                    toast.success(" Added To Cart");
                  } catch (err) {
                    console.log(err);
                    toast.error("Failed to add in cart");
                  }
                }}
              >
                {isAddingToCart ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <ShoppingBag size={20} />
                )}
                Add To Cart
              </Button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};

export default ProductPage;
