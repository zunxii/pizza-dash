import { Order } from "@/types/order-types";
import { OrderBadges } from "./OrderBadges";
import { StarRating } from "./StarRating";
import { OrderActions } from "./OrderActions";

interface TabletOrderTableProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
}

export const TabletOrderTable: React.FC<TabletOrderTableProps> = ({ 
  orders, 
  onOrderClick 
}) => {
  return (
    <div className="hidden md:block xl:hidden overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold">Order</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Pizza</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Qty</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Price</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Priority</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Rating</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-200/50">
          {orders.map((order, index) => (
            <tr 
              key={order.id} 
              className={`hover:bg-orange-50/50 transition-colors cursor-pointer ${
                index % 2 === 0 ? 'bg-white/50' : 'bg-orange-25/30'
              }`}
              onClick={() => onOrderClick(order)}
            >
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {order.id.slice(-2)}
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">{order.id}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{order.customerName}</div>
                  <div className="text-xs text-gray-500">{order.phone}</div>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-900 text-sm">{order.pizzaType}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                  {order.quantity}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="font-bold text-green-600 text-sm">${order.price.toFixed(2)}</span>
              </td>
              <td className="px-4 py-3">
                <OrderBadges status={order.status} priority={order.priority} />
              </td>
              <td className="px-4 py-3">
                <StarRating rating={order.satisfaction} />
              </td>
              <td className="px-4 py-3">
                <OrderActions order={order} onOrderClick={onOrderClick} isCompact={true} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
