import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";

import AppHeader from "../../components/common/AppHeader";
import BottomDrawer from "../../components/common/BottomDrawer";
import { useGetOrderByIdQuery } from "../../store/api/ordersApi";

const StatusItem = ({
  title,
  isCompleted,
  isLast,
}: {
  title: string;
  isCompleted: boolean;
  isLast?: boolean;
}) => (
  <div className="relative flex gap-4 pb-6">
    {!isLast && (
      <div
        className={`absolute left-[11px] top-6 w-0.5 h-full border-l-2 border-dashed ${
          isCompleted ? "border-black" : "border-[#E6E6E6]"
        }`}
      />
    )}

    <div
      className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white ${
        isCompleted ? "border-black" : "border-[#E6E6E6]"
      }`}
    >
      {isCompleted && <div className="w-3 h-3 bg-black rounded-full" />}
    </div>

    <h4
      className={`font-bold ${isCompleted ? "text-black" : "text-[#B3B3B3]"}`}
    >
      {title}
    </h4>
  </div>
);

const TrackOrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const { data: order, isLoading } = useGetOrderByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading || !order) {
    return <p className="p-5">Loading order status...</p>;
  }

  const STATUS_STEPS = [
    { key: "placed", label: "Order Placed" },
    { key: "confirmed", label: "Order Confirmed" },
    { key: "shipped", label: "In Transit" },
    { key: "delivered", label: "Delivered" },
  ] as const;

  const currentIndex = STATUS_STEPS.findIndex(
    (step) => step.key === order.status,
  );

  return (
    <div className="relative h-screen bg-white overflow-hidden">
      <AppHeader title="Track Order" showBack rightIcon="notification" />

      {/* Map Placeholder */}
      <div className="w-full h-full bg-[#F3F4F6]">
        <img src="/trackorder.png" className="w-full" />
      </div>

      {isDrawerOpen && (
        <BottomDrawer
          title="Order Status"
          closeDrawer={() => setIsDrawerOpen(false)}
        >
          <div className="px-5 pb-8">
            {STATUS_STEPS.map((step, index) => (
              <StatusItem
                key={step.key}
                title={step.label}
                isCompleted={index <= currentIndex}
                isLast={index === STATUS_STEPS.length - 1}
              />
            ))}

            <div className="mt-6 flex items-start gap-3 text-sm text-gray-600">
              <MapPin size={18} />
              <p>
                Delivering to <strong>{order.shippingAddress.city}</strong>
              </p>
            </div>
          </div>
        </BottomDrawer>
      )}
    </div>
  );
};

export default TrackOrderPage;
