import { useState } from "react";
import { Star, Trash2 } from "lucide-react";

import BottomDrawer from "../../components/common/BottomDrawer";
import Button from "../../components/ui/Button";
import ReviewDrawerContent from "./ReviewDrawer";

import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetMyReviewForProductQuery,
  useUpdateReviewMutation,
} from "../../store/api/reviewsApi";
import { useAppSelector } from "../../hooks/redux";

import type { OrderItem, OrderStatus } from "../../types";

type Props = {
  orderId: string;
  item: OrderItem;
  status: OrderStatus;
};
const OrderItemRow = ({ orderId, item, status }: Props) => {
  console.log(orderId);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locallyDeleted, setLocallyDeleted] = useState(false);

  const { initialized, user } = useAppSelector((s) => s.auth);

  const canReview = status === "delivered";

  const { data: review, isLoading } = useGetMyReviewForProductQuery(
    { productId: item.product },
    {
      skip: !initialized || !user,
    },
  );

  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const hasReviewed = !!review && !locallyDeleted;

  return (
    <div className="border border-[#E6E6E6] rounded-[10px] flex gap-4 px-[15px] py-4 bg-white">
      {/* Product Image */}
      <div className="w-[80px] h-[80px] shrink-0 overflow-hidden rounded-md bg-[#F5F5F5]">
        <img
          src="/productPlaceholder.png"
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="truncate">
            <p className="text-sm font-semibold leading-tight truncate">
              {item.name}
            </p>
            <p className="text-xs text-[#808080] mt-1">Size: {item.size}</p>
          </div>

          {/* Rating preview (ONLY if delivered + reviewed) */}
          {canReview && hasReviewed && (
            <div className="flex items-center gap-0.5 shrink-0 bg-[#FFF9F0] px-1.5 py-0.5 rounded">
              <Star size={12} className="fill-[#FFA928] stroke-[#FFA928]" />
              <span className="text-[11px] font-bold text-[#FFA928]">
                {review.rating}
              </span>
            </div>
          )}
        </div>

        {/* Actions (ONLY for delivered orders) */}
        {canReview && !isLoading && (
          <div className="flex gap-2 mt-3 justify-between">
            <Button
              size="xs"
              className="w-min! text-nowrap"
              onClick={() => setDrawerOpen(true)}
            >
              {hasReviewed ? "Edit Review" : "Leave Review"}
            </Button>

            {hasReviewed && (
              <button
                onClick={async () => {
                  await deleteReview({ reviewId: review._id }).unwrap();
                  setLocallyDeleted(true);
                }}
                className="flex gap-1 items-center text-[10px] text-[#ED1010]! w-min! text-nowrap"
              >
                <Trash2 size={13} />
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {/* Review Drawer */}
      {canReview && drawerOpen && (
        <BottomDrawer
          title={hasReviewed ? "Edit Review" : "Leave Review"}
          closeDrawer={() => setDrawerOpen(false)}
        >
          <ReviewDrawerContent
            existingReview={review}
            onSubmit={async (rating, comment) => {
              if (hasReviewed) {
                await updateReview({
                  reviewId: review._id,
                  body: { rating, comment },
                }).unwrap();
              } else {
                await createReview({
                  productId: item.product,
                  body: { rating, comment },
                }).unwrap();
              }
              setDrawerOpen(false);
            }}
          />
        </BottomDrawer>
      )}
    </div>
  );
};

export default OrderItemRow;
