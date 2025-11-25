"use client";

import Link from "next/link";
import { Sprout, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Header() {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="w-full py-4 px-6 bg-paper-cream border-b border-earth-green/10 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
            <Link href="/" className="flex items-center gap-2 text-earth-green">
                <Sprout className="w-6 h-6" />
                <span className="text-xl font-serif font-bold tracking-tight">Khet-Bazaar</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-text-ink/80">
                <Link href="/" className="hover:text-earth-green transition-colors">Home</Link>
                <Link href="/mandis" className="hover:text-earth-green transition-colors">Mandis</Link>
                <Link href="#" className="hover:text-earth-green transition-colors">Trends</Link>
                <Link href="#" className="hover:text-earth-green transition-colors">About</Link>
            </nav>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 text-sm font-medium text-text-ink hover:text-earth-green transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-earth-green/10 flex items-center justify-center text-earth-green">
                                <UserIcon className="w-4 h-4" />
                            </div>
                            <span>{user.name}</span>
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1">
                                <div className="px-4 py-2 border-b border-gray-50">
                                    <p className="text-xs text-gray-500 uppercase">Role</p>
                                    <p className="text-sm font-medium text-earth-green capitalize">{user.role}</p>
                                </div>
                                <Link
                                    href={`/dashboard/${user.role}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link href="/login" className="text-sm font-medium hover:text-earth-green transition-colors">
                            Login
                        </Link>
                        <Link href="/signup" className="px-4 py-2 bg-earth-green text-white text-sm font-medium rounded-full hover:bg-opacity-90 transition-all">
                            Join as Volunteer
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
