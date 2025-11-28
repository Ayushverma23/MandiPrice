"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createListing } from "@/services/marketData";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";
import { Upload } from "lucide-react";

export default function SellRequestPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        crop: "",
        quantity: "",
        price: "",
        description: "",
        allowDelivery: false,
        allowPickup: true,
        isNegotiable: false
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const supabase = createClient();
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('listings')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('listings')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);
        try {
            let imageUrl = "placeholder.jpg";
            if (imageFile) {
                const uploadedUrl = await uploadImage(imageFile);
                if (uploadedUrl) {
                    imageUrl = uploadedUrl;
                }
            }

            await createListing({
                farmerId: user.id,
                crop: formData.crop,
                quantity: Number(formData.quantity),
                price: Number(formData.price),
                image: imageUrl,
                description: formData.description
            });
            router.push("/dashboard/farmer");
        } catch (error) {
            console.error("Failed to create listing", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-serif font-bold text-text-ink">New Sell Request</h1>
                    <p className="text-gray-500">List your produce for Mandi sellers and buyers.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                            <select
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green bg-white"
                                value={formData.crop}
                                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                            >
                                <option value="">Select Crop</option>
                                <option value="Maize (Makka)">Maize (Makka)</option>
                                <option value="Wheat">Wheat</option>
                                <option value="Rice">Rice</option>
                                <option value="Potato">Potato</option>
                                <option value="Litchi">Litchi</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Quintals)</label>
                            <input
                                type="number"
                                required
                                min="1"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                                placeholder="e.g. 50"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price (per Quintal)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                            <input
                                type="number"
                                required
                                min="1"
                                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                                placeholder="e.g. 2200"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Current Mandi Rate: ₹2150 - ₹2250</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                            placeholder="Describe your produce (quality, variety, harvest date, etc.)"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Logistics & Preferences */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Logistics Preference</label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-earth-green focus:ring-earth-green border-gray-300 rounded"
                                        checked={formData.allowDelivery}
                                        onChange={(e) => setFormData({ ...formData, allowDelivery: e.target.checked })}
                                    />
                                    <span className="text-sm text-gray-700">I can deliver to buyer</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-earth-green focus:ring-earth-green border-gray-300 rounded"
                                        checked={formData.allowPickup}
                                        onChange={(e) => setFormData({ ...formData, allowPickup: e.target.checked })}
                                    />
                                    <span className="text-sm text-gray-700">Buyer must pick up</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Negotiation</label>
                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-earth-green focus:ring-earth-green border-gray-300 rounded"
                                    checked={formData.isNegotiable}
                                    onChange={(e) => setFormData({ ...formData, isNegotiable: e.target.checked })}
                                />
                                <div>
                                    <span className="block text-sm font-medium text-gray-700">Open to Negotiations</span>
                                    <span className="block text-xs text-gray-500 mt-0.5">Allow buyers to send counter-offers</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-earth-green/50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                            />
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                                <Upload className="w-6 h-6" />
                            </div>
                            <p className="text-sm text-gray-500">
                                {imageFile ? imageFile.name : "Click to upload photos of your crop"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-3 bg-earth-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
                        >
                            {isLoading ? "Publishing..." : "Publish Listing"}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
