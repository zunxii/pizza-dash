import { Clock } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Clock className="w-8 h-8 text-orange-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
      <p className="text-gray-600">Orders will appear here when customers place them.</p>
    </div>
  );
};