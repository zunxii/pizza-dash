import { Order } from "@/types/order-types";
import { OrderBadges } from "./OrderBadges";
import { StarRating } from "./StarRating";
import { OrderActions } from "./OrderActions";

interface DesktopOrderTableProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
}

export const DesktopOrderTable: React.FC<DesktopOrderTableProps> = ({ 
  orders, 
  onOrderClick 
}) => {
  return (
    <div className="hidden xl:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Pizza Type</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Quantity</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Priority</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
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
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {order.id.slice(-2)}
                  </div>
                  <span className="font-semibold text-gray-900">{order.id}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.phone}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-900">{order.pizzaType}</td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                  {order.quantity}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-bold text-green-600">${order.price.toFixed(2)}</span>
              </td>
              <td className="px-6 py-4">
                <OrderBadges status={order.status} priority={order.priority} />
              </td>
              <td className="px-6 py-4">
                <StarRating rating={order.satisfaction} />
              </td>
              <td className="px-6 py-4">
                <OrderActions order={order} onOrderClick={onOrderClick} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
