import { ChevronDown, Star } from "lucide-react";
import { useGetProductReviewsQuery } from "../../../../store/api/reviewsApi";

const RatingBar = ({
  stars,
  percentage,
}: {
  stars: number;
  percentage: number;
}) => (
  <div className="flex items-center gap-4 mb-2">
    <div className="flex gap-1.5 w-24">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < stars ? "fill-[#FFA928] text-[#FFA928]" : "text-gray-200"
          }
        />
      ))}
    </div>
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-black rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const ReviewCard = ({ name, date, comment, rating }: any) => (
  <div className="py-6 border-b border-[#E6E6E6] last:border-0">
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "fill-[#FFA928] text-[#FFA928]" : "text-gray-200"
          }
        />
      ))}
    </div>
    <p className="text-[#808080] leading-relaxed mb-3">{comment}</p>
    <div className="flex items-center gap-2">
      <span className="font-bold text-sm">{name}</span>
      <span className="text-[#808080] text-sm">• {date}</span>
    </div>
  </div>
);

type Props = {
  productId: string;
};

const ReviewsSection = ({ productId }: Props) => {
  const { data, isLoading, isError } = useGetProductReviewsQuery({ productId });

  if (isLoading) return <p className="p-5">Loading reviews...</p>;
  if (isError || !data) return <p className="p-5">Failed to load reviews</p>;

  const { reviews, pagination } = data;

  const averageRating2 =
    reviews.reduce((acc, rev) => (acc = acc + rev.rating), 0) / reviews.length;
  console.log(averageRating2);
  const total = pagination.totalReviews;

  const ratingData = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return {
      stars: star,
      percentage: total ? Math.round((count / total) * 100) : 0,
    };
  });

  return (
    <div className="bg-white pb-5">
      {/* Overall Score */}
      <div className="items-start justify-between ">
        <div className="flex items-center gap-3 mb-5">
          <h1
            className="text-[64px] font-semibold"
            style={{ lineHeight: "80%" }}
          >
            {averageRating2 && averageRating2.toFixed(1)}
          </h1>

          <div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={22}
                  className={
                    i < Math.round(averageRating2)
                      ? "fill-[#FFA928] text-[#FFA928]"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
            <p className="text-[#808080] mt-1">
              {pagination.totalReviews} Ratings
            </p>
          </div>
        </div>

        <div className="flex-1">
          {ratingData.map((data) => (
            <RatingBar
              key={data.stars}
              stars={data.stars}
              percentage={data.percentage}
            />
          ))}
        </div>
      </div>

      <hr className="my-5 text-[#E6E6E6]" />

      {/* Reviews List */}
      <div className="flex items-center justify-between ">
        <h3 className="text-xl font-bold">{pagination.totalReviews} Reviews</h3>
        <button className="flex items-center gap-1 text-sm font-medium text-[#808080]">
          Most Relevant <ChevronDown size={16} />
        </button>
      </div>

      <div>
        {reviews.map((rev) => (
          <ReviewCard
            key={rev._id}
            name={rev.user.displayName}
            rating={rev.rating}
            comment={rev.comment}
            date={new Date(rev.createdAt).toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
