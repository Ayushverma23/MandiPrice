"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Package, Clock, CheckCircle, Truck } from "lucide-react";

// Mock Data for Orders
const MOCK_ORDERS = [
    {
        id: "ORD-2024-001",
        date: "2024-11-28",
        items: "Fresh Red Onions (500 kg)",
        farmer: "Ram Kumar",
        amount: "₹6,000",
        status: "In Transit",
        statusColor: "text-blue-600 bg-blue-50 border-blue-100",
        icon: <Truck className="w-4 h-4" />
    },
    {
        id: "ORD-2024-002",
        date: "2024-11-25",
        items: "Potatoes (200 kg)",
        farmer: "Amit Verma",
        amount: "₹1,600",
        status: "Delivered",
        statusColor: "text-green-600 bg-green-50 border-green-100",
        icon: <CheckCircle className="w-4 h-4" />
    },
    {
        id: "ORD-2024-003",
        date: "2024-11-29",
        items: "Basmati Rice (1000 kg)",
        farmer: "Kisan Agro",
        amount: "₹45,000",
        status: "Pending Confirmation",
        statusColor: "text-orange-600 bg-orange-50 border-orange-100",
        icon: <Clock className="w-4 h-4" />
    }
];

export default function BuyerOrdersPage() {
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
                            {MOCK_ORDERS.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-ink">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.date}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.items}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.farmer}</td>
                                    <td className="px-6 py-4 font-medium text-text-ink">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${order.statusColor}`}>
                                            {order.icon}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-earth-green hover:text-earth-green/80 font-medium text-xs">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
