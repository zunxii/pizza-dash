import { Order } from "@/types/order-types";
import { OrderTableProps } from "@/types/props";
import { Edit, Eye, MoreVertical, Star } from "lucide-react";

export const OrderTable: React.FC<OrderTableProps> = ({ orders, onOrderClick }) => {
  const getStatusBadge = (status: Order['status']) => {
    const configs = {
      'Pending': 'bg-amber-100 text-amber-800',
      'Preparing': 'bg-red-100 text-red-800',
      'Out for Delivery': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-emerald-100 text-emerald-800',
      'Cancelled': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${configs[status]}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority: Order['priority']) => {
    const configs = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${configs[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-200/50 overflow-hidden">
      <div className="overflow-x-auto">
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
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4">
                  {getPriorityBadge(order.priority)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < order.satisfaction ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{order.satisfaction}.0</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOrderClick(order);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit
                      }}
                      className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};