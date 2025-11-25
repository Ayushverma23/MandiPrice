"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { User, ShieldCheck, CreditCard, MapPin } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Profile & Settings</h1>
                <p className="text-gray-500">Manage your personal and bank details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Details */}
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-earth-green/10 rounded-full flex items-center justify-center text-earth-green">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-text-ink">Personal Details</h2>
                            <p className="text-sm text-gray-500">Your basic information</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Full Name</label>
                            <p className="font-medium text-text-ink">{user?.name}</p>
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Email Address</label>
                            <p className="font-medium text-text-ink">{user?.email}</p>
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Phone Number</label>
                            <p className="font-medium text-text-ink">{user?.phone || "+91 98765 43210"}</p>
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 font-medium mb-1">District</label>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <p className="font-medium text-text-ink">{user?.district || "Patna"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bank & KYC */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-text-ink">KYC Status</h2>
                                <p className="text-sm text-gray-500">Identity verification</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-100">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="font-medium">Verified Farmer (Kisan Card)</span>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-text-ink">Bank Details</h2>
                                <p className="text-sm text-gray-500">For receiving payments</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Account Holder</label>
                                <p className="font-medium text-text-ink">{user?.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Account Number</label>
                                <p className="font-medium text-text-ink font-mono">XXXX-XXXX-8892</p>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-medium mb-1">IFSC Code</label>
                                <p className="font-medium text-text-ink font-mono">SBIN0001234</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
