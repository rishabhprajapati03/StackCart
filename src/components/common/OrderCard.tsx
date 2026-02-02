import OrderItemRow from "../../pages/order/OrderItemRow";
import type { Order } from "../../types";

type Props = {
  order: Order;
};

const OrderCard = ({ order }: Props) => {
  // Formatting date for better UX (assuming order.createdAt exists)
  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent Order";

  return (
    <div className="bg-white border-b border-[#E6E6E6] pb-6 mb-6 last:border-0">
      {/* Order header */}
      <div className="flex justify-between items-start mb-4 px-1">
        <div className="space-y-0.5">
          <h2 className="text-[15px] font-bold text-[#1A1A1A]">
            Order #{order._id.slice(-6).toUpperCase()}
          </h2>
          <p className="text-xs text-[#808080] font-medium">
            Placed on {orderDate}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#808080] opacity-70">
            Status
          </span>
          <span className="text-sm font-semibold capitalize text-[#1A1A1A]">
            {order.status}
          </span>
        </div>
      </div>

      {/* Order items */}
      <div className="space-y-3">
        {order.items.map((item) => (
          <OrderItemRow
            key={`${order._id}-${item.product}-${item.size}`}
            orderId={order._id}
            item={item}
            status={order.status}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
