import BottomDrawer from "../../../components/common/BottomDrawer";
import ReviewsSection from "./reviews/ReviewsSection";

type Props = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (val: boolean) => void;
  productId: string;
};

const ProductReviewsDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  productId,
}: Props) => {
  return (
    <>
      {isDrawerOpen && (
        <BottomDrawer
          title="Reviews"
          closeDrawer={() => setIsDrawerOpen(false)}
        >
          <ReviewsSection productId={productId} />
        </BottomDrawer>
      )}
    </>
  );
};

export default ProductReviewsDrawer;
