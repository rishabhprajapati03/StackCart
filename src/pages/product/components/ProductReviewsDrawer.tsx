import BottomDrawer from "../../../components/common/BottomDrawer";
import ReviewsSection from "./reviews/ReviewsSection";

type Props = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (val: boolean) => void;
};
const ProductReviewsDrawer = ({ isDrawerOpen, setIsDrawerOpen }: Props) => {
  return (
    <>
      {isDrawerOpen && (
        <BottomDrawer
          title="Reviews"
          closeDrawer={() => setIsDrawerOpen(false)}
          children={<ReviewsSection />}
        ></BottomDrawer>
      )}
    </>
  );
};

export default ProductReviewsDrawer;
