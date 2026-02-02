import { useGetAllCategoriesQuery } from "../../../store/api/productsApi";
import { useSearchParams } from "react-router-dom";

const CategorySkeleton = () => {
  return (
    <div className="h-9 w-22 shrink-0 text-nowrap bg-[#CCCCCC] animate-pulse rounded-md"></div>
  );
};

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";

  const setCategory = (category?: string) => {
    const params = new URLSearchParams(searchParams);

    if (!category || category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    params.set("page", "1");
    setSearchParams(params);
  };
  const {
    data: categories,
    isLoading,
    error,
    isError,
  } = useGetAllCategoriesQuery();

  if (isError) {
    console.log(error);
    return <h2>Failed to Load Categories</h2>;
  }
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar my-4">
      {isLoading ? (
        <>
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
        </>
      ) : (
        <>
          <button
            onClick={() => setCategory("All")}
            className={`px-3 py-1.5 rounded-md text-base capitalize font-medium border transition-all whitespace-nowrap
              ${
                activeCategory === "All"
                  ? "bg-[#1A1A1A] text-white border-black"
                  : "bg-white text-black border-[#E6E6E6]"
              }`}
          >
            All
          </button>

          {categories &&
            categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setCategory(category.name)}
                className={`px-3 py-1.5 rounded-md text-base capitalize font-medium border transition-all whitespace-nowrap
              ${
                activeCategory === category.name
                  ? "bg-[#1A1A1A] text-white border-black"
                  : "bg-white text-black border-[#E6E6E6]"
              }`}
              >
                {category.name}
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default Categories;
