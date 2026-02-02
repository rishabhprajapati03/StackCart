import { useState } from "react";
import ButtonTabs from "../../components/ui/ButtonTabs";
import OrderCard from "../../components/common/OrderCard";
import { useGetOrdersQuery } from "../../store/api/ordersApi";
import type { Order } from "../../types";
import { useAppSelector } from "../../hooks/redux";

type ActiveTab = "Ongoing" | "Completed";

const OrdersPage = () => {
  const { initialized, user } = useAppSelector((s) => s.auth);
  const [activeTab, setActiveTab] = useState<ActiveTab>("Ongoing");

  const { data, isLoading, isError } = useGetOrdersQuery(
    {
      page: 1,
      limit: 10,
    },
    {
      skip: !initialized || !user,
    },
  );

  if (isLoading) {
    return <p className="p-5">Loading orders...</p>;
  }

  if (isError || !data?.orders) {
    return <p className="p-5">Failed to load orders</p>;
  }

  const orders: Order[] = data.orders;

  const ongoingOrders = orders.filter(
    (order) =>
      order.status === "placed" ||
      order.status === "confirmed" ||
      order.status === "shipped",
  );

  const completedOrders = orders.filter(
    (order) => order.status === "delivered",
  );

  const visibleOrders =
    activeTab === "Ongoing" ? ongoingOrders : completedOrders;

  return (
    <div className="flex-1">
      {/* Tabs */}
      <ButtonTabs
        options={["Ongoing", "Completed"]}
        activeValue={activeTab}
        onChange={() =>
          setActiveTab((prev) => (prev === "Ongoing" ? "Completed" : "Ongoing"))
        }
      />

      {/* Orders */}
      <div className="mt-5">
        {visibleOrders.length === 0 ? (
          <p className="text-center text-gray-500 text-sm mt-10">
            {activeTab === "Ongoing"
              ? "No ongoing orders"
              : "No completed orders yet"}
          </p>
        ) : (
          <div className="space-y-3.5">
            {visibleOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
