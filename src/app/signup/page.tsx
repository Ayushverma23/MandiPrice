"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sprout, Tractor, Store, ShoppingBag } from "lucide-react";
import { UserRole } from "@/services/auth";

export default function SignupPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [role, setRole] = useState<UserRole | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        district: "",
        phone: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const { signup } = useAuth();
    const router = useRouter();

    const handleRoleSelect = (selectedRole: UserRole) => {
        setRole(selectedRole);
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role) return;

        setIsLoading(true);
        try {
            await signup({
                name: formData.name,
                email: formData.email,
                role: role,
                district: formData.district,
                phone: formData.phone
            });
            router.push("/");
        } catch (error) {
            console.error("Signup failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper-cream px-4 py-12">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-earth-green mb-6 hover:opacity-80 transition-opacity">
                        <Sprout className="w-6 h-6" />
                        <span className="font-serif font-bold text-xl">Khet-Bazaar</span>
                    </Link>
                    <h1 className="text-2xl font-serif font-bold text-text-ink">
                        {step === 1 ? "Choose your Role" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {step === 1 ? "How do you want to use Khet Bazaar?" : `Signing up as a ${role?.charAt(0).toUpperCase()}${role?.slice(1)}`}
                    </p>
                </div>

                {step === 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => handleRoleSelect('farmer')}
                            className="p-6 rounded-xl border-2 border-gray-100 hover:border-earth-green hover:bg-earth-green/5 transition-all flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Tractor className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-text-ink mb-1">Farmer</h3>
                            <p className="text-xs text-gray-500">I want to sell my produce</p>
                        </button>

                        <button
                            onClick={() => handleRoleSelect('arthiya')}
                            className="p-6 rounded-xl border-2 border-gray-100 hover:border-earth-green hover:bg-earth-green/5 transition-all flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Store className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-text-ink mb-1">Mandi Seller</h3>
                            <p className="text-xs text-gray-500">I trade at the Mandi</p>
                        </button>

                        <button
                            onClick={() => handleRoleSelect('buyer')}
                            className="p-6 rounded-xl border-2 border-gray-100 hover:border-earth-green hover:bg-earth-green/5 transition-all flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-text-ink mb-1">Buyer</h3>
                            <p className="text-xs text-gray-500">I want to buy in bulk</p>
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                            <select
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green bg-white"
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            >
                                <option value="">Select District</option>
                                <option value="Patna">Patna</option>
                                <option value="Muzaffarpur">Muzaffarpur</option>
                                <option value="Purnia">Purnia</option>
                                <option value="Gaya">Gaya</option>
                                {/* Add more districts as needed */}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 py-3 bg-earth-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-earth-green font-medium hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
