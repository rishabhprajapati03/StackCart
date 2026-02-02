import { CircleX } from "lucide-react";

type SearchHistoryCardProps = {
  title: string;
  handleOnClose?: () => void;
};
const SearchHistoryCard = ({
  title,
  handleOnClose,
}: SearchHistoryCardProps) => {
  return (
    <div className="flex">
      <h2 className="flex-1">{title}</h2>
      <button onClick={handleOnClose} className="w-6 h-6 shrink-0">
        <CircleX className="stroke-[#999999] h-6 w-6" />
      </button>
    </div>
  );
};

const SearchHistory = () => {
  return (
    <div className="space-y-4 pb-4">
      <div className="flex gap-4 justify-between ">
        <h2 className="text-xl font-semibold">Recent Searches</h2>
        <button className="text-sm underline">Clear All</button>
      </div>
      <SearchHistoryCard title="Jeans" />
      <hr className="text-[#E6E6E6]" />
      <SearchHistoryCard title="Hoodie" />
      <hr className="text-[#E6E6E6]" />
      <SearchHistoryCard title="Casual clothes" />
      <hr className="text-[#E6E6E6]" />
      <SearchHistoryCard title="Nike shoes black" />
      <hr className="text-[#E6E6E6]" />
      <SearchHistoryCard title="V-neck tshirt" />
      <hr className="text-[#E6E6E6]" />
      <SearchHistoryCard title="Winter clothes" />
      <hr className="text-[#E6E6E6]" />
      <SearchHistoryCard title="Jeans" />
    </div>
  );
};

export default SearchHistory;
