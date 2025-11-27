"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PriceComparison from "@/components/dashboard/PriceComparison";
import { getMyListings, Listing } from "@/services/marketData";
import { useAuth } from "@/context/AuthContext";
import { TrendingUp, ShoppingCart, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function FarmerDashboard() {
    const { user } = useAuth();
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getMyListings(user.id).then(data => {
                setListings(data);
                setLoading(false);
            });
        }
    }, [user]);

    const activeListings = listings.filter(l => l.status === 'active').length;
    const totalSales = listings.filter(l => l.status === 'sold').reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Welcome back, {user?.name}</h1>
                <p className="text-gray-500">Here&apos;s what&apos;s happening with your crops today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Sales</p>
                            <h3 className="text-2xl font-bold text-text-ink">₹{totalSales.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Listings</p>
                            <h3 className="text-2xl font-bold text-text-ink">{activeListings}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Actions</p>
                            <h3 className="text-2xl font-bold text-text-ink">2</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Listings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-serif font-bold text-xl text-text-ink">Recent Listings</h2>
                        <Link href="/dashboard/farmer/sell" className="text-sm font-medium text-earth-green hover:underline">
                            + New Request
                        </Link>
                    </div>

                    {loading ? (
                        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Crop</th>
                                        <th className="px-6 py-4 font-medium">Quantity</th>
                                        <th className="px-6 py-4 font-medium">Price/Q</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {listings.map(listing => (
                                        <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-text-ink">{listing.crop}</td>
                                            <td className="px-6 py-4 text-gray-600">{listing.quantity} Q</td>
                                            <td className="px-6 py-4 text-gray-600">₹{listing.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${listing.status === 'active' ? 'bg-green-100 text-green-800' :
                                                        listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {listing.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">{listing.datePosted}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Price Comparison Widget */}
                <div className="lg:col-span-1">
                    <PriceComparison />
                </div>
            </div>
        </DashboardLayout>
    );
}
