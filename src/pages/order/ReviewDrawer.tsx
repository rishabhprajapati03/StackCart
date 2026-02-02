import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";

import type { Review } from "../../types";

type Props = {
  existingReview?: Review | null;
  onSubmit: (rating: number, comment: string) => Promise<void>;
};

const ReviewDrawerContent = ({ existingReview, onSubmit }: Props) => {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(rating, comment);
      toast.success(existingReview ? "Review updated" : "Review submitted");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold">How was your product?</h2>
        <p className="text-sm text-[#808080]">
          Share your experience with others
        </p>
      </div>

      {/* Rating */}
      <div className="flex justify-center gap-4">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = i + 1;
          return (
            <Star
              key={value}
              onClick={() => setRating(value)}
              className={`h-7 w-7 cursor-pointer ${
                value <= rating
                  ? "fill-[#FFA928] stroke-[#FFA928]"
                  : "stroke-[#E6E6E6]"
              }`}
            />
          );
        })}
      </div>

      {/* Comment */}
      <textarea
        className="w-full min-h-[120px] border border-[#E6E6E6] rounded-xl px-4 py-3 text-sm"
        placeholder="Write your review (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={1000}
      />
      <Button
        onClick={handleSubmit}
        disabled={submitting}
        isSubmitting={submitting}
      >
        {existingReview ? "Update Review" : "Submit Review"}
      </Button>
    </div>
  );
};

export default ReviewDrawerContent;
