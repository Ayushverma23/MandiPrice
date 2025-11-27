"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { getOrders, Order, updateOrderStatus, submitNegotiation } from "@/services/marketData";
import { Check, X, MessageCircle, Truck, Package } from "lucide-react";
import NegotiationModal from "@/components/dashboard/NegotiationModal";

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState<'incoming' | 'active' | 'history'>('incoming');
    const [negotiatingOrder, setNegotiatingOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (user) {
            getOrders(user.id).then(setOrders);
        }
    }, [user]);

    const handleStatusUpdate = async (orderId: string, status: Order['status']) => {
        await updateOrderStatus(orderId, status);
        // Optimistic update
        setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    };

    const handleNegotiationSubmit = async (price: number, message: string) => {
        if (negotiatingOrder) {
            await submitNegotiation(negotiatingOrder.id, price, message);
            setNegotiatingOrder(null);
            alert("Counter offer sent!");
        }
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'incoming') return order.status === 'pending';
        if (activeTab === 'active') return ['accepted', 'in_transit'].includes(order.status);
        return ['completed', 'rejected', 'cancelled'].includes(order.status);
    });

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Order Management</h1>
                <p className="text-gray-500">Manage incoming orders and track deliveries.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('incoming')}
                    className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'incoming' ? 'text-earth-green' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Incoming Requests
                    {activeTab === 'incoming' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-earth-green" />}
                </button>
                <button
                    onClick={() => setActiveTab('active')}
                    className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'active' ? 'text-earth-green' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Active Orders
                    {activeTab === 'active' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-earth-green" />}
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'history' ? 'text-earth-green' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Order History
                    {activeTab === 'history' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-earth-green" />}
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No orders found in this category.</p>
                    </div>
                ) : (
                    filteredOrders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg text-text-ink">{order.buyerName}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500">Crop</p>
                                            <p className="font-medium">{order.crop}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Quantity</p>
                                            <p className="font-medium">{order.quantity} Q</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Price/Q</p>
                                            <p className="font-medium">₹{order.price}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Total</p>
                                            <p className="font-bold text-earth-green">₹{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded w-fit">
                                        <Truck className="w-4 h-4" />
                                        {order.deliveryMethod === 'farmer_delivery' ? 'You deliver to buyer' : 'Buyer picks up'}
                                    </div>
                                </div>

                                {activeTab === 'incoming' && (
                                    <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'accepted')}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-earth-green text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
                                        >
                                            <Check className="w-4 h-4" /> Accept
                                        </button>
                                        <button
                                            onClick={() => setNegotiatingOrder(order)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-earth-green text-earth-green rounded-lg hover:bg-earth-green/5 transition-colors text-sm font-medium"
                                        >
                                            <MessageCircle className="w-4 h-4" /> Negotiate
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'rejected')}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                                        >
                                            <X className="w-4 h-4" /> Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Negotiation Modal */}
            {negotiatingOrder && (
                <NegotiationModal
                    isOpen={!!negotiatingOrder}
                    onClose={() => setNegotiatingOrder(null)}
                    currentPrice={negotiatingOrder.price}
                    orderId={negotiatingOrder.id}
                    onSubmitOffer={handleNegotiationSubmit}
                />
            )}
        </DashboardLayout>
    );
}
