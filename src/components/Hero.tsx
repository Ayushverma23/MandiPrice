"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getMandiStats, MandiStats } from "@/services/marketData";

export default function Hero() {
    const [stats, setStats] = useState<MandiStats | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getMandiStats().then(setStats);
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
            // In a real app, this would navigate to a search results page
            // router.push(`/search?q=${searchQuery}`);
            const resultsSection = document.getElementById('live-market');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-paper-cream overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-earth-green rounded-full blur-3xl mix-blend-multiply" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-soil-brown rounded-full blur-3xl mix-blend-multiply" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto space-y-6"
            >
                <span className="inline-block px-4 py-1.5 rounded-full bg-earth-green/10 text-earth-green font-medium text-sm tracking-wide border border-earth-green/20">
                    Bihar&apos;s First Digital Mandi
                </span>

                <h1 className="text-5xl md:text-7xl font-serif font-bold text-text-ink leading-tight">
                    Sahi Daam, <br />
                    <span className="text-earth-green">Sahi Faisla.</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-sans">
                    Empowering farmers across Bihar with real-time market rates,
                    direct from the Mandi to your mobile.
                </p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center w-full max-w-lg mx-auto mt-8 bg-white rounded-full shadow-xl border border-gray-100 p-2"
                >
                    <div className="pl-4 text-gray-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for crops (e.g. Potato, Litchi)..."
                        className="flex-1 px-4 py-3 bg-transparent outline-none text-text-ink placeholder:text-gray-400 font-sans"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-earth-green text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
                    >
                        Search
                    </button>
                </motion.div>

                <div className="pt-12 flex items-center justify-center gap-8 text-sm text-gray-500 font-sans">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-2xl text-soil-brown">{stats?.districtsCovered || 38}</span>
                        <span>Districts Covered</span>
                    </div>
                    <div className="w-px h-10 bg-gray-300" />
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-2xl text-soil-brown">{stats?.totalMandis || "150+"}</span>
                        <span>Mandis Live</span>
                    </div>
                    <div className="w-px h-10 bg-gray-300" />
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-2xl text-soil-brown">Daily</span>
                        <span>Updates</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
