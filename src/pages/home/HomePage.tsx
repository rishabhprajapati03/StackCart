import SearchHeader from "./SearchHeader";
import Categories from "./components/Categories";
import Products from "./components/Products";

const HomePage = () => {
  return (
    <div className="w-full">
      <SearchHeader />
      <Categories />
      <Products />
    </div>
  );
};

export default HomePage;
