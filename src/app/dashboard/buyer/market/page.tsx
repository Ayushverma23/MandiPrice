"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Search, Filter, MapPin, Tag } from "lucide-react";
import Image from "next/image";

// Mock Data for Marketplace
const MOCK_LISTINGS = [
    {
        id: 1,
        crop: "Fresh Red Onions",
        variety: "Nashik Red",
        quantity: "500 kg",
        price: "₹1,200/qtl",
        farmer: "Ram Kumar",
        district: "Patna",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=500",
        category: "Vegetables"
    },
    {
        id: 2,
        crop: "Organic Wheat",
        variety: "Sharbati",
        quantity: "2000 kg",
        price: "₹2,400/qtl",
        farmer: "Suresh Singh",
        district: "Gaya",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=500",
        category: "Grains"
    },
    {
        id: 3,
        crop: "Potatoes",
        variety: "Jyoti",
        quantity: "1000 kg",
        price: "₹800/qtl",
        farmer: "Amit Verma",
        district: "Nalanda",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500",
        category: "Vegetables"
    },
    {
        id: 4,
        crop: "Basmati Rice",
        variety: "1121 Steam",
        quantity: "5000 kg",
        price: "₹4,500/qtl",
        farmer: "Kisan Agro",
        district: "Buxar",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500",
        category: "Grains"
    },
    {
        id: 5,
        crop: "Tomatoes",
        variety: "Hybrid Desi",
        quantity: "200 kg",
        price: "₹1,500/qtl",
        farmer: "Rajesh Yadav",
        district: "Patna",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500",
        category: "Vegetables"
    },
    {
        id: 6,
        crop: "Mustard Seeds",
        variety: "Yellow",
        quantity: "300 kg",
        price: "₹5,200/qtl",
        farmer: "Bihar Farms",
        district: "Muzaffarpur",
        image: "https://images.unsplash.com/photo-1508349356385-05d825c9609a?auto=format&fit=crop&q=80&w=500",
        category: "Oilseeds"
    }
];

export default function MarketplacePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDistrict, setSelectedDistrict] = useState("All");

    const filteredListings = MOCK_LISTINGS.filter(item => {
        const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.farmer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesDistrict = selectedDistrict === "All" || item.district === selectedDistrict;

        return matchesSearch && matchesCategory && matchesDistrict;
    });

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Marketplace</h1>
                <p className="text-gray-500">Browse and purchase fresh produce directly from farmers.</p>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8 sticky top-4 z-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search crops, farmers..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-earth-green focus:ring-1 focus:ring-earth-green outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                        <select
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-earth-green outline-none"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Grains">Grains</option>
                            <option value="Oilseeds">Oilseeds</option>
                        </select>

                        <select
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-earth-green outline-none"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            <option value="All">All Districts</option>
                            <option value="Patna">Patna</option>
                            <option value="Gaya">Gaya</option>
                            <option value="Muzaffarpur">Muzaffarpur</option>
                            <option value="Nalanda">Nalanda</option>
                            <option value="Buxar">Buxar</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="relative h-48 w-full bg-gray-100">
                            <Image
                                src={item.image}
                                alt={item.crop}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-earth-green shadow-sm">
                                {item.category}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-text-ink">{item.crop}</h3>
                                    <p className="text-sm text-gray-500">{item.variety}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-earth-green text-lg">{item.price}</p>
                                    <p className="text-xs text-gray-400">approx.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {item.district}, Bihar
                            </div>

                            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                        {item.farmer.charAt(0)}
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-medium text-text-ink">{item.farmer}</p>
                                        <p className="text-gray-400">Farmer</p>
                                    </div>
                                </div>

                                <button className="px-4 py-2 bg-earth-green text-white text-sm font-medium rounded-lg hover:bg-earth-green/90 transition-colors">
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
