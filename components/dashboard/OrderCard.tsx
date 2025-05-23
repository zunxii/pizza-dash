import { OrderCardProps } from "@/types/props";
import { CheckCircle, ChefHat, Clock, Edit, Eye, MapPin, Package, Phone, Pizza, Star, XCircle } from "lucide-react";

export const OrderCard: React.FC<OrderCardProps> = ({ order, onClick, isSelected }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Pending':
        return { 
          color: 'from-amber-400 to-orange-500',
          icon: <Clock className="w-4 h-4" />,
          pulse: 'animate-pulse'
        };
      case 'Preparing':
        return { 
          color: 'from-red-500 to-pink-600',
          icon: <ChefHat className="w-4 h-4" />,
          pulse: 'animate-bounce'
        };
      case 'Out for Delivery':
        return { 
          color: 'from-blue-500 to-indigo-600',
          icon: <Package className="w-4 h-4" />,
          pulse: 'animate-pulse'
        };
      case 'Delivered':
        return { 
          color: 'from-emerald-500 to-teal-600',
          icon: <CheckCircle className="w-4 h-4" />,
          pulse: ''
        };
      case 'Cancelled':
        return { 
          color: 'from-gray-500 to-gray-600',
          icon: <XCircle className="w-4 h-4" />,
          pulse: ''
        };
      default:
        return { 
          color: 'from-gray-400 to-gray-500',
          icon: <Clock className="w-4 h-4" />,
          pulse: ''
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
        isSelected ? 'scale-105 -translate-y-2 z-10' : ''
      }`}
    >
      <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-200/50 overflow-hidden">
        {/* Status bar */}
        <div className={`h-2 bg-gradient-to-r ${statusConfig.color}`} />
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${statusConfig.color} rounded-xl flex items-center justify-center text-white shadow-lg ${statusConfig.pulse}`}>
                <span className="font-bold text-sm">{order.id.slice(-2)}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{order.id}</h3>
                <p className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl text-gray-900">${order.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
            </div>
          </div>

          {/* Pizza info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Pizza className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{order.pizzaType}</p>
              <p className="text-sm text-gray-600">{order.customerName}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${statusConfig.color} text-white text-sm font-medium shadow-lg`}>
              {statusConfig.icon}
              <span>{order.status}</span>
            </div>
            {order.estimatedTime && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{order.estimatedTime}</span>
              </div>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{order.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{order.address}</span>
            </div>
          </div>

          {/* Satisfaction rating */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < order.satisfaction ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex space-x-1">
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
};