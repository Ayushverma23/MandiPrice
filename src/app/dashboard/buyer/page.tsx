"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Store, ShoppingBag, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BuyerDashboard() {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-ink">
                    Welcome back, {user?.name?.split(" ")[0] || "Buyer"}!
                </h1>
                <p className="text-gray-500 mt-2">
                    Explore fresh produce from local farmers and manage your orders.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-earth-green rounded-lg">
                            <Store className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Active Listings</p>
                            <h3 className="text-2xl font-bold text-text-ink">124</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">My Active Orders</p>
                            <h3 className="text-2xl font-bold text-text-ink">3</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Spent</p>
                            <h3 className="text-2xl font-bold text-text-ink">₹45,200</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-earth-green/5 rounded-2xl p-8 border border-earth-green/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-text-ink mb-2">Ready to purchase fresh stock?</h2>
                        <p className="text-gray-600">Browse the marketplace for the latest harvest from verified farmers.</p>
                    </div>
                    <Link
                        href="/dashboard/buyer/market"
                        className="flex items-center gap-2 px-6 py-3 bg-earth-green text-white rounded-lg font-medium hover:bg-earth-green/90 transition-colors shadow-sm"
                    >
                        Go to Marketplace
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
