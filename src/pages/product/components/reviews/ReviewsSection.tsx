import { ChevronDown, Star } from "lucide-react";

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

const ReviewsSection = () => {
  const ratingData = [
    { stars: 5, percentage: 80 },
    { stars: 4, percentage: 60 },
    { stars: 3, percentage: 40 },
    { stars: 2, percentage: 20 },
    { stars: 1, percentage: 10 },
  ];

  const reviews = [
    {
      name: "Wade Warren",
      date: "6 days ago",
      rating: 5,
      comment:
        "The item is very good, my son likes it very much and plays every day.",
    },
    {
      name: "Guy Hawkins",
      date: "1 week ago",
      rating: 4,
      comment:
        "The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!",
    },
    {
      name: "Robert Fox",
      date: "2 weeks ago",
      rating: 4,
      comment:
        "I just bought it and the stuff is really good! I highly recommend it!",
    },
  ];

  return (
    <div className="bg-white pb-5">
      {/* Overall Score */}
      <div className="items-start justify-between ">
        <div className="flex items-center gap-3 mb-5">
          <h1
            className="text-[64px] font-semibold"
            style={{ lineHeight: "80%" }}
          >
            4.0
          </h1>
          <div className="">
            <div className="flex gap-1 ">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  size={22}
                  className="fill-[#FFA928] text-[#FFA928]"
                />
              ))}
              <Star size={22} className="text-gray-200" />
            </div>
            <p className="text-[#808080] mt-1">1034 Ratings</p>
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
        <h3 className="text-xl font-bold">45 Reviews</h3>
        <button className="flex items-center gap-1 text-sm font-medium text-[#808080]">
          Most Relevant <ChevronDown size={16} />
        </button>
      </div>
      <div>
        {reviews.map((rev, i) => (
          <>
            <ReviewCard key={i} {...rev} />
          </>
        ))}
      </div>
    </div>
  );
};
export default ReviewsSection;
