"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { getPayments, Payment } from "@/services/marketData";
import { useAuth } from "@/context/AuthContext";
import { Download } from "lucide-react";

export default function PaymentsPage() {
    const { user } = useAuth();
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        if (user) {
            getPayments(user.id).then(setPayments);
        }
    }, [user]);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Payments (Hisaab Kitaab)</h1>
                <p className="text-gray-500">Track your earnings and pending payments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <p className="text-sm text-green-600 font-medium">Total Received</p>
                    <h3 className="text-2xl font-bold text-green-700 mt-1">₹1,10,000</h3>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                    <p className="text-sm text-yellow-600 font-medium">Pending</p>
                    <h3 className="text-2xl font-bold text-yellow-700 mt-1">₹45,000</h3>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Buyer</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Receipt</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {payments.map(payment => (
                            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-600">{payment.date}</td>
                                <td className="px-6 py-4 font-medium text-text-ink">{payment.buyerName}</td>
                                <td className="px-6 py-4 font-medium">₹{payment.amount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${payment.status === 'verified' ? 'bg-green-100 text-green-800' :
                                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-earth-green hover:text-earth-green/80 transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
