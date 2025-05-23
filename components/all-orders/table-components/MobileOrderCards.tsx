import { Order } from "@/types/order-types";
import { Phone, DollarSign } from "lucide-react";
import { OrderBadges } from "./OrderBadges";
import { StarRating } from "./StarRating";
import { OrderActions } from "./OrderActions";
import { useState } from "react";

interface MobileOrderCardsProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
}

export const MobileOrderCards: React.FC<MobileOrderCardsProps> = ({ 
  orders, 
  onOrderClick 
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  return (
    <div className="md:hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 px-4 py-3">
        <h3 className="text-white font-semibold text-sm">Orders ({orders.length})</h3>
      </div>
      <div className="divide-y divide-orange-200/50">
        {orders.map((order, index) => (
          <div key={order.id} className="p-4">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  {order.id.slice(-2)}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{order.id}</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <OrderBadges status={order.status} priority={order.priority} />
                  </div>
                </div>
              </div>
              <OrderActions order={order} onOrderClick={onOrderClick} isCompact={true} />
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900 text-sm">{order.customerName}</div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Phone className="w-3 h-3" />
                  <span className="text-xs">{order.phone}</span>
                </div>
              </div>
              <div className="text-sm text-gray-700">{order.pizzaType}</div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center text-xs font-semibold">
                  {order.quantity}
                </div>
                <span className="text-sm text-gray-600">Quantity</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-600 text-sm">${order.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rating:</span>
                <StarRating rating={order.satisfaction} size="small" />
              </div>
              <button
                onClick={() => onOrderClick(order)}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                View Details →
              </button>
            </div>

            {/* Expandable Details */}
            {expandedOrderId === order.id && (
              <div className="mt-3 pt-3 border-t border-orange-200/50">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Time:</span>
                    <span className="text-gray-900">Just now</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="text-gray-900">25-30 mins</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};