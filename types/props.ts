import { Order } from "./order-types";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend: string;
}

export interface OrderCardProps {
  order: Order;
  onClick: () => void;
  isSelected: boolean;
}

export interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentTime: Date;
  viewMode: 'cards' | 'table';
  onViewModeChange: (mode: 'cards' | 'table') => void;
}

export interface OrderTableProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
}