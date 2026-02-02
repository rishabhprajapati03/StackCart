import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetMyReviewForProductQuery,
  useUpdateReviewMutation,
} from "../store/api/reviewsApi";
import { useAppSelector } from "./redux";

const useMyReview = (productId: string) => {
  const { initialized, user } = useAppSelector((s) => s.auth);

  const {
    data: myReview,
    isLoading,
    isError,
  } = useGetMyReviewForProductQuery(
    { productId },
    {
      skip: !initialized || !user || !productId,
    },
  );

  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const hasReviewed = !!myReview;

  return {
    review: myReview,
    hasReviewed,
    isLoading,
    isError,

    create: (rating: number, comment?: string) =>
      createReview({
        productId,
        body: { rating, comment },
      }).unwrap(),

    update: (rating?: number, comment?: string) =>
      myReview
        ? updateReview({
            reviewId: myReview._id,
            body: { rating, comment },
          }).unwrap()
        : Promise.reject("No review to update"),

    remove: () =>
      myReview
        ? deleteReview({ reviewId: myReview._id }).unwrap()
        : Promise.reject("No review to delete"),
  };
};

export default useMyReview;
