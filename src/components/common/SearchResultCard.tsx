import { ArrowUpRight } from "lucide-react"; // Using Lucide for the arrow icon
import { Link } from "react-router-dom";

interface SearchResultCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
}

const SearchResultCard = ({
  id,
  image,
  title,
  price,
}: SearchResultCardProps) => {
  console.log(id);
  return (
    <Link
      to={`/product/${id}`}
      className="group flex items-stretch justify-between gap-4 "
    >
      {/* Product Image */}
      <div className=" shrink-0  flex gap-3">
        <div className="w-14 h-13.25 rounded-md bg-[#CCCCCC] overflow-hidden">
          <img
            src={image}
            alt={title}
            className=" w-full h-full bg-gray-50 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col gap-1 justify-around py-1">
          <h3 className="text-base font-semibold text-[#1A1A1A] leading-tight tracking-tight line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-[#808080]">$ {price}</p>
        </div>
      </div>

      {/* Action Icon */}
      <div className="shrink-0 flex items-center">
        <ArrowUpRight className="w-6 h-6" />
      </div>
    </Link>
  );
};

export default SearchResultCard;
