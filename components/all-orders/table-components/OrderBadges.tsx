import { Order } from "@/types/order-types";

interface OrderBadgesProps {
  status: Order['status'];
  priority: Order['priority'];
}

export const OrderBadges: React.FC<OrderBadgesProps> = ({ status, priority }) => {
  const getStatusBadge = (status: Order['status']) => {
    const configs = {
      'Pending': 'bg-amber-100 text-amber-800',
      'Preparing': 'bg-red-100 text-red-800',
      'Out for Delivery': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-emerald-100 text-emerald-800',
      'Cancelled': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${configs[status]}`}>
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
    <>
      {getStatusBadge(status)}
      {getPriorityBadge(priority)}
    </>
  );
};