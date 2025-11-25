"use client";

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import MandiCard from "@/components/MandiCard";
import { getAllMandis, getDistricts, MarketUpdate } from "@/services/marketData";

export default function MandisPage() {
    const [mandis, setMandis] = useState<MarketUpdate[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [mandiData, districtData] = await Promise.all([
                getAllMandis(),
                getDistricts()
            ]);
            setMandis(mandiData);
            setDistricts(["All", ...districtData]);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredMandis = mandis.filter(mandi => {
        const matchesDistrict = selectedDistrict === "All" || mandi.district === selectedDistrict;
        const matchesSearch = mandi.mandiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mandi.crop.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDistrict && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-paper-cream flex flex-col">
            <Header />

            <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <aside className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                        <div className="flex items-center gap-2 mb-6 text-earth-green">
                            <Filter className="w-5 h-5" />
                            <h2 className="font-serif font-bold text-xl">Filters</h2>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">District</label>
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-green/20"
                            >
                                {districts.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Showing {filteredMandis.length} results
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="md:col-span-3 space-y-6">
                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search mandis, crops..."
                            className="flex-1 bg-transparent outline-none text-text-ink placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Results Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMandis.map(mandi => (
                                <MandiCard key={mandi.id} data={mandi} />
                            ))}

                            {filteredMandis.length === 0 && (
                                <div className="col-span-full py-20 text-center text-gray-400">
                                    No mandis found matching your criteria.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
