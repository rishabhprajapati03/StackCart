import { Mic, Search } from "lucide-react";
import { useState } from "react";

import InputTwo from "../../components/ui/InputTwo";
import SearchHistory from "../../components/common/SearchHistory";
import SearchResultCard from "../../components/common/SearchResultCard";
import EmptyStateUi from "../../components/common/EmptyStateUi";

import { useGetAllProductsQuery } from "../../store/api/productsApi";
import SearchSkeletonCards from "../../components/common/SearchSkeletonCards";

const SearchPage = () => {
  const [searchInputVal, setSearchInputVal] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isFetching, isError } = useGetAllProductsQuery(
    searchQuery ? { search: searchQuery } : {},
  );

  const products = data?.products ?? [];

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <InputTwo
        leftIcon={Search}
        rightIcon={Mic}
        maxLength={20}
        type="text"
        value={searchInputVal}
        onChange={(e) => setSearchInputVal(e.target.value)}
        onKeyDown={(e) => {
          const val = searchInputVal.trim();
          if (!val) return;
          if (e.key === "Enter") {
            setSearchQuery(val);
          }
        }}
        placeholder="Search for Clothes..."
        autoFocus
      />

      {/* search history when search query is "" */}
      {!searchQuery && <SearchHistory />}

      {/* Error */}
      {isError && <div>Something went wrong</div>}

      {/* noo results */}
      {searchQuery && !isFetching && products.length === 0 && (
        <EmptyStateUi
          title="No Result Found!"
          content="Try a similar word or something more general."
          LabelIcon={Search}
        />
      )}

      {isFetching && searchQuery && <SearchSkeletonCards />}
      {/* Results */}
      {searchQuery !== "" &&
        !isFetching &&
        products.map((product) => (
          <div key={product._id} className="space-y-4">
            <SearchResultCard
              id={product._id}
              title={product.name}
              price={(product.price / 100).toString()}
              image={product.images[0]}
            />
            <hr className="text-[#E6E6E6]" />
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
