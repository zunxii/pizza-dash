export interface Order {
  id: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  price: number;
  phone: string;
  address: string;
  estimatedTime?: string;
  priority: 'high' | 'medium' | 'low';
  satisfaction: number;
  orderTime : string;
}