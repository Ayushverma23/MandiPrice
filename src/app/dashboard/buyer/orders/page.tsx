"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Package, Clock, CheckCircle, Truck, XCircle, MessageCircle } from "lucide-react";
import { getBuyerOrders, Order, initiateNegotiation, submitNegotiation, getNegotiations, Negotiation } from "@/services/marketData";
import { useAuth } from "@/context/AuthContext";
import NegotiationModal from "@/components/dashboard/NegotiationModal";

import { useToast } from "@/context/ToastContext";

export default function BuyerOrdersPage() {
    const { user } = useAuth();
    const { success, error } = useToast();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [negotiatingOrder, setNegotiatingOrder] = useState<Order | null>(null);
    const [negotiationHistory, setNegotiationHistory] = useState<Negotiation[]>([]);

    const fetchOrders = async () => {
        if (!user) return;
        try {
            const data = await getBuyerOrders(user.id);
            setOrders(data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const handleNegotiateClick = async (order: Order) => {
        setNegotiatingOrder(order);
        try {
            const history = await getNegotiations(order.id);
            // Mark current user's messages as 'Me'
            const formattedHistory = history.map(h => ({
                ...h,
                senderName: h.senderId === user?.id ? 'Me' : h.senderName
            }));
            setNegotiationHistory(formattedHistory);
        } catch (err) {
            console.error("Failed to fetch negotiation history", err);
        }
    };

    const handleNegotiationSubmit = async (price: number, message: string) => {
        if (!negotiatingOrder) return;
        try {
            await submitNegotiation(negotiatingOrder.id, price, message);
            setNegotiatingOrder(null);
            success("Counter offer sent!");
            fetchOrders(); // Refresh to see updated price/status
        } catch (err) {
            console.error("Failed to submit negotiation", err);
            error("Failed to submit offer. Please try again.");
        }
    };

    const getStatusConfig = (status: Order['status']) => {
        switch (status) {
            case 'completed':
                return { color: "text-green-600 bg-green-50 border-green-100", icon: <CheckCircle className="w-4 h-4" />, label: "Delivered" };
            case 'in_transit':
                return { color: "text-blue-600 bg-blue-50 border-blue-100", icon: <Truck className="w-4 h-4" />, label: "In Transit" };
            case 'pending':
                return { color: "text-orange-600 bg-orange-50 border-orange-100", icon: <Clock className="w-4 h-4" />, label: "Pending" };
            case 'accepted':
                return { color: "text-purple-600 bg-purple-50 border-purple-100", icon: <CheckCircle className="w-4 h-4" />, label: "Accepted" };
            case 'cancelled':
            case 'rejected':
                return { color: "text-red-600 bg-red-50 border-red-100", icon: <XCircle className="w-4 h-4" />, label: "Cancelled" };
            default:
                return { color: "text-gray-600 bg-gray-50 border-gray-100", icon: <Package className="w-4 h-4" />, label: status };
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">My Orders</h1>
                <p className="text-gray-500">Track and manage your purchases.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-500">Order ID</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Date</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Items</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Farmer</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Amount</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Loading orders...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                                </tr>
                            ) : (
                                orders.map((order) => {
                                    const statusConfig = getStatusConfig(order.status);
                                    return (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-text-ink">#{order.id.slice(0, 8)}</td>
                                            <td className="px-6 py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-gray-600">{order.crop} ({order.quantity} Q)</td>
                                            <td className="px-6 py-4 text-gray-600">{order.farmerName}</td>
                                            <td className="px-6 py-4 font-medium text-text-ink">₹{order.totalAmount.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${statusConfig.color}`}>
                                                    {statusConfig.icon}
                                                    {statusConfig.label}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {order.status === 'pending' ? (
                                                    <button
                                                        onClick={() => handleNegotiateClick(order)}
                                                        className="flex items-center gap-1 text-earth-green hover:text-earth-green/80 font-medium text-xs border border-earth-green/20 px-2 py-1 rounded hover:bg-earth-green/5"
                                                    >
                                                        <MessageCircle className="w-3 h-3" /> Negotiate
                                                    </button>
                                                ) : (
                                                    <button className="text-gray-400 font-medium text-xs cursor-not-allowed">
                                                        View Details
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {negotiatingOrder && (
                <NegotiationModal
                    isOpen={!!negotiatingOrder}
                    onClose={() => setNegotiatingOrder(null)}
                    currentPrice={negotiatingOrder.price}
                    orderId={negotiatingOrder.id}
                    onSubmitOffer={handleNegotiationSubmit}
                    history={negotiationHistory}
                />
            )}
        </DashboardLayout>
    );
}
