import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, List, Settings, LogOut, Menu, X, CircleHelp, Store, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <h2 className="font-serif font-bold text-xl text-earth-green">Khet-Bazaar</h2>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex flex-col
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="font-serif font-bold text-xl text-earth-green">Khet-Bazaar</h2>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{user?.role} Dashboard</p>
                    </div>
                    <button onClick={closeMobileMenu} className="md:hidden p-1 hover:bg-gray-100 rounded text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {user?.role === 'farmer' && (
                        <>
                            <Link
                                href="/dashboard/farmer"
                                onClick={closeMobileMenu}
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
                                onClick={closeMobileMenu}
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
                                onClick={closeMobileMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer/listings')
                                    ? 'bg-earth-green/10 text-earth-green'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <List className="w-5 h-5" />
                                My Listings
                            </Link>

                            <Link
                                href="/dashboard/farmer/orders"
                                onClick={closeMobileMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer/orders')
                                    ? 'bg-earth-green/10 text-earth-green'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="w-5 h-5 flex items-center justify-center font-bold text-xs border border-current rounded">📦</div>
                                Orders
                            </Link>

                            <Link
                                href="/dashboard/farmer/payments"
                                onClick={closeMobileMenu}
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
                                onClick={closeMobileMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer/profile')
                                    ? 'bg-earth-green/10 text-earth-green'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Settings className="w-5 h-5" />
                                Profile & Settings
                            </Link>

                            <Link
                                href="/dashboard/farmer/help"
                                onClick={closeMobileMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/farmer/help')
                                    ? 'bg-earth-green/10 text-earth-green'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <CircleHelp className="w-5 h-5" />
                                Help & Support
                            </Link>
                        </>
                    )}

                    {user?.role === 'buyer' && (
                        <>
                            <Link
                                href="/dashboard/buyer"
                                onClick={closeMobileMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/buyer')
                                    ? 'bg-earth-green/10 text-earth-green'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Overview
                            </Link>

                            <Link
                                href="/dashboard/buyer/market"
                                onClick={closeMobileMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/buyer/market')
                                    ? 'bg-earth-green/10 text-earth-green'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Store className="w-5 h-5" />
                                Marketplace
                            </Link>

                            <Link
                                href="/dashboard/buyer/orders"
                                onClick={closeMobileMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/buyer/orders')
                                    ? 'bg-earth-green/10 text-earth-green'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <ShoppingBag className="w-5 h-5" />
                                My Orders
                            </Link>

                            <Link
                                href="/dashboard/buyer/profile"
                                onClick={closeMobileMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard/buyer/profile')
                                    ? 'bg-earth-green/10 text-earth-green'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Settings className="w-5 h-5" />
                                Profile & Settings
                            </Link>
                        </>
                    )}
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
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
