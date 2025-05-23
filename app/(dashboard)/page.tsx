'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Package, DollarSign, Star, Activity } from 'lucide-react';
import Link from 'next/link';
import { Order } from '@/types/order-types';
import { mockOrders } from '@/database/data';
import { StatCard } from '@/components/dashboard/Statcard';
import { OrderCard } from '@/components/dashboard/OrderCard';
import { OrderDetailModal } from '@/components/dashboard/OrderDetailModel';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  const recentOrders = mockOrders.slice(0, 3); // Show only first 3 orders

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
    <>
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

      {/* Recent Orders Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Recent Orders ({recentOrders.length})
        </h2>
        <Link
          href="/all-orders"
          className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow transition-colors"
        >
          View All Orders
        </Link>
      </div>

      {/* Recent Orders Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onClick={() => setSelectedOrder(order)}
            isSelected={selectedOrder?.id === order.id}
          />
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}