import type { Product, Size } from "../../../types";
import { Heart, Star } from "lucide-react";

type Props = {
  data: Product;
  selectedSize: Size;
  setSelectedSize: (val: Size) => void;
  setIsDrawerOpen: (val: boolean) => void;
};

const ProductDetails = ({
  data,
  setIsDrawerOpen,
  selectedSize,
  setSelectedSize,
}: Props) => {
  return (
    <main className="pb-25 px-5">
      {/* Product Image Container */}
      <div className="relative w-full aspect-4/5 bg-[#F3F4F6] rounded-3xl overflow-hidden mb-3">
        <img
          src={data.images[0]}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-5 right-5 p-3 bg-white rounded-[10px] shadow-lg text-black hover:text-red-500 transition-colors">
          <Heart size={24} />
        </button>
      </div>

      {/* Product Title and Rating */}
      <section className="mb-2">
        <h2 className="text-2xl font-semibold mb-3.25">{data.name}</h2>
        <div
          className="flex items-center gap-1.5 "
          onClick={() => setIsDrawerOpen(true)}
        >
          <Star className="fill-[#FFA928] text-[#FFA928]" size={20} />
          <span className="text-[#808080] font-medium">(45 reviews)</span>
        </div>
      </section>

      {/* Description */}
      <p className="text-[#808080] leading-relaxed mb-3">{data.description}</p>

      {/* Size Selection */}
      <section className="mb-3">
        <h3 className="text-xl font-semibold mb-3">Choose size</h3>
        <div className="flex gap-2.5 flex-wrap">
          {data?.sizes.map((size) => (
            <button
              key={size.size}
              onClick={() => setSelectedSize(size.size)}
              className={`min-w-14 px-3 h-12 rounded-xl flex items-center  justify-center text-xl font-medium border-2 transition-all
                  ${
                    selectedSize === size.size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-[#E6E6E6]"
                  }`}
            >
              {size.size}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
