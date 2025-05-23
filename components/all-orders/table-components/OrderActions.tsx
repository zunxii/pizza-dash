import { Edit, Eye, MoreVertical } from "lucide-react";
import { Order } from "@/types/order-types";

interface OrderActionsProps {
  order: Order;
  onOrderClick: (order: Order) => void;
  isCompact?: boolean;
}

export const OrderActions: React.FC<OrderActionsProps> = ({ 
  order, 
  onOrderClick, 
  isCompact = false 
}) => {
  return (
    <div className={`flex items-center ${isCompact ? 'space-x-1' : 'space-x-2'}`}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onOrderClick(order);
        }}
        className={`${isCompact ? 'p-1.5' : 'p-2'} text-blue-600 hover:bg-blue-100 rounded-lg transition-colors`}
        title="View Order"
      >
        <Eye className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'}`} />
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          // Handle edit
        }}
        className={`${isCompact ? 'p-1.5' : 'p-2'} text-orange-600 hover:bg-orange-100 rounded-lg transition-colors`}
        title="Edit Order"
      >
        <Edit className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'}`} />
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${isCompact ? 'p-1.5' : 'p-2'} text-gray-600 hover:bg-gray-100 rounded-lg transition-colors`}
        title="More Options"
      >
        <MoreVertical className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'}`} />
      </button>
    </div>
  );
};
