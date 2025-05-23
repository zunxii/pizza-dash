'use client'

import { useState, useEffect } from 'react';
import {   Search,   Clock,   CheckCircle,   XCircle,   ChefHat,  Pizza,  Phone,  MapPin,  Users,  Package,  DollarSign,  Bell,  Star,  X,  MessageSquare,  Edit,  Eye,  Activity,  Target,  ArrowUp,RefreshCw,MoreVertical} from 'lucide-react';
import { Order } from '@/types/order-types';
import { mockOrders } from '@/database/data';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/Statcard';
import { OrderTable } from '@/components/dashboard/OrderTable';
import { OrderCard } from '@/components/dashboard/OrderCard';
import { OrderDetailModal } from '@/components/dashboard/OrderDetailModel';

const PizzaDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredOrders = mockOrders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalOrders: mockOrders.length,
    pendingOrders: mockOrders.filter(o => o.status === 'Pending').length,
    preparingOrders: mockOrders.filter(o => o.status === 'Preparing').length,
    outForDelivery: mockOrders.filter(o => o.status === 'Out for Delivery').length,
    deliveredOrders: mockOrders.filter(o => o.status === 'Delivered').length,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.price, 0),
    avgSatisfaction: mockOrders.reduce((sum, order) => sum + order.satisfaction, 0) / mockOrders.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentTime={currentTime}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Orders"
            value={stats.totalOrders}
            icon={<Package className="w-6 h-6" />}
            color="from-blue-500 to-indigo-600"
            trend="+12%"
          />
          <StatCard
            label="Active Orders"
            value={stats.pendingOrders + stats.preparingOrders + stats.outForDelivery}
            icon={<Activity className="w-6 h-6" />}
            color="from-orange-500 to-red-600"
            trend="+8%"
          />
          <StatCard
            label="Revenue"
            value={`${stats.totalRevenue.toFixed(2)}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="from-green-500 to-emerald-600"
            trend="+15%"
          />
          <StatCard
            label="Avg Rating"
            value={stats.avgSatisfaction.toFixed(1)}
            icon={<Star className="w-6 h-6" />}
            color="from-yellow-500 to-orange-500"
            trend="+5%"
          />
        </div>

        {/* Orders Section */}
        <div className="mb-6 flex gap-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Recent Orders ({filteredOrders.length})
          </h2>
            {filteredOrders.length > 3 && (
    <button
      onClick={() => setViewMode('table')}
      className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow"
    >
      See All Orders
    </button>
)}
        </div>

        {/* Orders Display */}
        {viewMode === 'cards' ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.slice(0, 3).map((order) => (
  <OrderCard
    key={order.id}
    order={order}
    onClick={() => setSelectedOrder(order)}
    isSelected={selectedOrder?.id === order.id}
  />
))}
          </div>
        ) : (
          <OrderTable
            orders={filteredOrders}
            onOrderClick={setSelectedOrder}
          />
        )}

        {/* No results */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default PizzaDashboard;