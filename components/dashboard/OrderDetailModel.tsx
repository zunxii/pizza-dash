'use client'
import { Order } from "@/types/order-types";
import { OrderDetailModalProps } from "@/types/props";
import { Activity, Clock, Edit, MapPin, MessageSquare, Phone, Pizza, RefreshCw, Star, Target, Users, X } from "lucide-react";
import { useState } from "react";

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleStatusUpdate = async (newStatus: Order['status']) => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdating(false);
    onClose();
  };

  const statusConfig = {
    'Pending': { color: 'from-amber-400 to-orange-500', next: 'Preparing' },
    'Preparing': { color: 'from-red-500 to-pink-600', next: 'Out for Delivery' },
    'Out for Delivery': { color: 'from-blue-500 to-indigo-600', next: 'Delivered' },
    'Delivered': { color: 'from-emerald-500 to-teal-600', next: null },
    'Cancelled': { color: 'from-gray-500 to-gray-600', next: null }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <div className={`h-32 bg-gradient-to-br ${statusConfig[order.status].color} rounded-t-3xl relative overflow-hidden`}>
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{order.id}</h2>
                  <p className="text-white/80">{order.customerName}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Order Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200/50">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Pizza className="w-5 h-5 text-orange-600 mr-2" />
                  Order Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold">{new Date(order.orderDate).toLocaleString()}</span>
                  </div>
                  {order.estimatedTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Time:</span>
                      <span className="font-semibold text-orange-600">{order.estimatedTime}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  Customer Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-900">{order.phone}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-900">{order.address}</span>
                  </div>
                  <div className="flex items-center space-x-3 pt-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div className="flex items-center space-x-2">
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
                      <span className="text-gray-700 font-medium">{order.satisfaction}.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-5 h-5 text-purple-600 mr-2" />
                  Order Status
                </h3>
                <div className="space-y-4">
                  <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r ${statusConfig[order.status].color} text-white`}>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <span className="font-semibold">{order.status}</span>
                  </div>
                  
                  {statusConfig[order.status].next && (
                    <button
                      onClick={() => handleStatusUpdate(statusConfig[order.status].next as Order['status'])}
                      disabled={isUpdating}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Target className="w-5 h-5" />
                          <span>Move to {statusConfig[order.status].next}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Call</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">SMS</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-100 text-orange-700 rounded-xl hover:bg-orange-200 transition-colors">
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm font-medium">Refresh</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200/50">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 text-gray-600 mr-2" />
              Order Timeline
            </h3>
            <div className="space-y-4">
              {[
                { status: 'Order Placed', time: order.orderDate, active: true },
                { status: 'Payment Confirmed', time: order.orderDate, active: true },
                { status: 'Preparing', time: order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? order.orderDate : null, active: order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered' },
                { status: 'Out for Delivery', time: order.status === 'Out for Delivery' || order.status === 'Delivered' ? order.orderDate : null, active: order.status === 'Out for Delivery' || order.status === 'Delivered' },
                { status: 'Delivered', time: order.status === 'Delivered' ? order.orderDate : null, active: order.status === 'Delivered' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${item.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <p className={`font-medium ${item.active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {item.status}
                    </p>
                    {item.time && (
                      <p className="text-sm text-gray-500">
                        {new Date(item.time).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};