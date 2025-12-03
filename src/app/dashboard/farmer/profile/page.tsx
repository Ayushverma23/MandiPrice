"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { User, ShieldCheck, CreditCard, MapPin, Edit2, Save, X, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

import { useToast } from "@/context/ToastContext";

export default function ProfilePage() {
    const { user, refreshProfile } = useAuth();
    const { success, error } = useToast();

    // Personal Details State
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [isSavingPersonal, setIsSavingPersonal] = useState(false);
    const [personalData, setPersonalData] = useState({
        name: "",
        phone: "",
        district: ""
    });

    // Bank Details State
    const [isEditingBank, setIsEditingBank] = useState(false);
    const [isSubmittingBank, setIsSubmittingBank] = useState(false);
    const [bankData, setBankData] = useState({
        accountHolder: "",
        accountNumber: "",
        ifsc: ""
    });
    const [bankVerificationPending, setBankVerificationPending] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        if (user) {
            setPersonalData({
                name: user.name || "",
                phone: user.phone || "",
                district: user.district || ""
            });
            // Mock bank data for now as it's not in the user object yet
            setBankData({
                accountHolder: user.name || "",
                accountNumber: "XXXX-XXXX-8892",
                ifsc: "SBIN0001234"
            });
        }
    }, [user]);

    const handleSavePersonal = async () => {
        if (!user) return;
        setIsSavingPersonal(true);

        try {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    full_name: personalData.name,
                    phone_number: personalData.phone,
                    district: personalData.district
                })
                .eq('id', user.id);

            if (updateError) throw updateError;

            await refreshProfile();
            setIsEditingPersonal(false);
            success("Profile updated successfully");
        } catch (err) {
            console.error("Error updating profile:", err);
            error("Failed to update profile. Please try again.");
        } finally {
            setIsSavingPersonal(false);
        }
    };

    const handleSubmitBank = async () => {
        setIsSubmittingBank(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmittingBank(false);
            setIsEditingBank(false);
            setBankVerificationPending(true);
            success("Bank details change request sent for verification. Admin will review shortly.");
        }, 1500);
    };

    const cancelPersonalEdit = () => {
        if (user) {
            setPersonalData({
                name: user.name || "",
                phone: user.phone || "",
                district: user.district || ""
            });
        }
        setIsEditingPersonal(false);
    };

    const cancelBankEdit = () => {
        // Reset to original (mock) data
        setBankData({
            accountHolder: user?.name || "",
            accountNumber: "XXXX-XXXX-8892",
            ifsc: "SBIN0001234"
        });
        setIsEditingBank(false);
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Profile & Settings</h1>
                <p className="text-gray-500">Manage your personal and bank details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Details Section */}
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-earth-green/10 rounded-full flex items-center justify-center text-earth-green">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-text-ink">Personal Details</h2>
                                <p className="text-sm text-gray-500">Your basic information</p>
                            </div>
                        </div>
                        {!isEditingPersonal ? (
                            <button
                                onClick={() => setIsEditingPersonal(true)}
                                className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                                title="Edit Personal Details"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button onClick={cancelPersonalEdit} className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
                                    <X className="w-4 h-4" />
                                </button>
                                <button onClick={handleSavePersonal} disabled={isSavingPersonal} className="p-2 text-earth-green hover:bg-green-50 rounded-lg">
                                    {isSavingPersonal ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Full Name</label>
                            {isEditingPersonal ? (
                                <input
                                    type="text"
                                    value={personalData.name}
                                    onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green"
                                />
                            ) : (
                                <p className="font-medium text-text-ink">{user?.name}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Email Address</label>
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-text-ink">{user?.email}</p>
                                {isEditingPersonal && (
                                    <span className="text-xs text-orange-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        Contact Admin to change
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Phone Number</label>
                            {isEditingPersonal ? (
                                <input
                                    type="tel"
                                    value={personalData.phone}
                                    onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green"
                                    placeholder="+91"
                                />
                            ) : (
                                <p className="font-medium text-text-ink">{user?.phone || "Not set"}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 font-medium mb-1">District</label>
                            {isEditingPersonal ? (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <select
                                        value={personalData.district}
                                        onChange={(e) => setPersonalData({ ...personalData, district: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green"
                                    >
                                        <option value="">Select District</option>
                                        <option value="Patna">Patna</option>
                                        <option value="Gaya">Gaya</option>
                                        <option value="Muzaffarpur">Muzaffarpur</option>
                                        <option value="Bhagalpur">Bhagalpur</option>
                                        <option value="Nalanda">Nalanda</option>
                                    </select>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <p className="font-medium text-text-ink">{user?.district || "Not set"}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bank & KYC Section */}
                <div className="space-y-8">
                    {/* KYC Status (Read Only) */}
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

                    {/* Bank Details (Verification Request Flow) */}
                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                        {bankVerificationPending && (
                            <div className="absolute top-0 left-0 right-0 bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-center justify-center gap-2 text-xs font-medium text-yellow-800">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Change Request Pending Verification
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-6 mt-2">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg text-text-ink">Bank Details</h2>
                                    <p className="text-sm text-gray-500">For receiving payments</p>
                                </div>
                            </div>
                            {!isEditingBank && !bankVerificationPending && (
                                <button
                                    onClick={() => setIsEditingBank(true)}
                                    className="text-sm font-medium text-earth-green hover:underline"
                                >
                                    Request Change
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Account Holder</label>
                                {isEditingBank ? (
                                    <input
                                        type="text"
                                        value={bankData.accountHolder}
                                        onChange={(e) => setBankData({ ...bankData, accountHolder: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green"
                                    />
                                ) : (
                                    <p className="font-medium text-text-ink">{user?.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Account Number</label>
                                {isEditingBank ? (
                                    <input
                                        type="text"
                                        value={bankData.accountNumber}
                                        onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green"
                                    />
                                ) : (
                                    <p className="font-medium text-text-ink font-mono">XXXX-XXXX-8892</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-medium mb-1">IFSC Code</label>
                                {isEditingBank ? (
                                    <input
                                        type="text"
                                        value={bankData.ifsc}
                                        onChange={(e) => setBankData({ ...bankData, ifsc: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green uppercase"
                                    />
                                ) : (
                                    <p className="font-medium text-text-ink font-mono">SBIN0001234</p>
                                )}
                            </div>

                            {isEditingBank && (
                                <div className="pt-4 flex items-center gap-3">
                                    <button
                                        onClick={cancelBankEdit}
                                        className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmitBank}
                                        disabled={isSubmittingBank}
                                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isSubmittingBank && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Submit for Verification
                                    </button>
                                </div>
                            )}

                            {isEditingBank && (
                                <p className="text-xs text-gray-500 italic mt-2">
                                    * Changes to bank details require admin approval and may take up to 24 hours.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
