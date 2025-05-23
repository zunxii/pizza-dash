import { Order } from "@/types/order-types";
import { OrderTableProps } from "@/types/props";
import { DesktopOrderTable } from "./table-components/DesktopOrderTable";
import { TabletOrderTable } from "./table-components/TabletOrderTable";
import { MobileOrderCards } from "./table-components/MobileOrderCards";
import { EmptyState } from "./table-components/EmptyState";

export const OrderTable: React.FC<OrderTableProps> = ({ orders, onOrderClick }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-200/50 overflow-hidden">
      <DesktopOrderTable orders={orders} onOrderClick={onOrderClick} />
      <TabletOrderTable orders={orders} onOrderClick={onOrderClick} />
      <MobileOrderCards orders={orders} onOrderClick={onOrderClick} />
      
      {orders.length === 0 && <EmptyState />}
    </div>
  );
};