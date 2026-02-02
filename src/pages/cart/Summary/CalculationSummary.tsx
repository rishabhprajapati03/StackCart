import { CartItem } from "../../../types";

type Props = {
  items: CartItem[];
};

const CalculationSummary = ({ items }: Props) => {
  const total =
    items?.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0) / 100;

  if (!items) return null;

  const summaryData = [
    { label: "Sub-total", value: total },
    { label: "VAT (%)", value: 0 },
    { label: "Shipping fee", value: 0 },
  ];

  return (
    <div className="w-full bg-white font-sans">
      <div className="space-y-4">
        {summaryData.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-[#808080] text-base ">{item.label}</span>
            <span className="text-black text-base font-medium">
              $ {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <hr className="border-[#E6E6E6] my-5" />

      {/* Totals Row */}
      <div className="flex justify-between items-center">
        <span className="text-black text-base">Total</span>
        <span className="text-black text-base font-semibold">
          $ {total.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default CalculationSummary;
