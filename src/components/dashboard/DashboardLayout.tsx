"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, List, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="font-serif font-bold text-xl text-earth-green">Khet-Bazaar</h2>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{user?.role} Dashboard</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/dashboard/farmer"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer')
                                ? 'bg-earth-green/10 text-earth-green'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Overview
                    </Link>

                    <Link
                        href="/dashboard/farmer/sell"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer/sell')
                                ? 'bg-earth-green/10 text-earth-green'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <PlusCircle className="w-5 h-5" />
                        Sell Request
                    </Link>

                    <Link
                        href="/dashboard/farmer/listings"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer/listings')
                                ? 'bg-earth-green/10 text-earth-green'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <List className="w-5 h-5" />
                        My Listings
                    </Link>

                    <Link
                        href="/dashboard/farmer/payments"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer/payments')
                                ? 'bg-earth-green/10 text-earth-green'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <div className="w-5 h-5 flex items-center justify-center font-bold text-xs border border-current rounded">₹</div>
                        Payments
                    </Link>

                    <Link
                        href="/dashboard/farmer/profile"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer/profile')
                                ? 'bg-earth-green/10 text-earth-green'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        Profile & Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
