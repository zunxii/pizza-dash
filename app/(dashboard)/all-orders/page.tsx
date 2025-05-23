'use client'
import { useState, useMemo } from 'react';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';
import { Order } from '@/types/order-types';
import { mockOrders } from '@/database/data';
import { OrderTable } from '@/components/all-orders/OrderTable';
import { OrderDetailModal } from '@/components/dashboard/OrderDetailModel';
import { PageHeader } from '@/components/all-orders/PageHeader';
import { OrderFilters } from '@/components/all-orders/OrderFilters';

export default function AllOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = mockOrders.filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime();
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Preparing', label: 'Preparing' },
    { value: 'Out for Delivery', label: 'Out for Delivery' },
    { value: 'Delivered', label: 'Delivered' }
  ];

  const handleExport = () => {
    // Simple CSV export functionality
    const headers = ['Order ID', 'Customer', 'Pizza Type', 'Price', 'Status', 'Order Time'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedOrders.map(order => [
        order.id,
        order.customerName,
        order.pizzaType,
        order.price,
        order.status,
        order.orderTime
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="mb-6">
        <PageHeader onExport={handleExport}/>
        <OrderFilters
          searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        />
      </div>

      {/* Orders Table */}
      {filteredAndSortedOrders.length > 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200/50 overflow-hidden">
          <OrderTable
            orders={filteredAndSortedOrders}
            onOrderClick={setSelectedOrder}
          />
        </div>
      ) : (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200/50">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}

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