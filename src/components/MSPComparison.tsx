import React from 'react';

const mspData = [
    {
        crop: "Wheat (Gehu)",
        msp: 2275,
        market: 2350,
        unit: "Quintal",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=100&q=80"
    },
    {
        crop: "Paddy (Dhan)",
        msp: 2300,
        market: 2420,
        unit: "Quintal",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80"
    },
    {
        crop: "Maize (Makka)",
        msp: 2225,
        market: 2280,
        unit: "Quintal",
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=100&q=80"
    },
    {
        crop: "Mustard (Sarso)",
        msp: 5650,
        market: 5800,
        unit: "Quintal",
        image: "https://images.unsplash.com/photo-1508751017801-cd6394162f18?auto=format&fit=crop&w=100&q=80"
    },
    {
        crop: "Gram (Chana)",
        msp: 5440,
        market: 5600,
        unit: "Quintal",
        image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=100&q=80"
    }
];

export default function MSPComparison() {
    return (
        <section className="py-16 bg-gradient-to-b from-paper-cream to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-block bg-earth-green text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        2024-25 Season
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-ink mb-4">
                        Know Your Right Price (MSP)
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Compare Government Minimum Support Price (MSP) with Khet Bazaar's average market rates.
                        <br />
                        <span className="text-earth-green font-semibold">We ensure you get paid above MSP.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {mspData.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group">
                            <div className="h-32 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                <img
                                    src={item.image}
                                    alt={item.crop}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-2 left-3 z-20 text-white font-bold text-lg shadow-black drop-shadow-md">
                                    {item.crop}
                                </div>
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Govt MSP</span>
                                    <span className="font-bold text-gray-700">₹{item.msp}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-earth-green uppercase tracking-wider">Market Rate</span>
                                    <span className="font-bold text-earth-green text-lg">₹{item.market}</span>
                                </div>
                                <div className="pt-2 text-xs text-right text-gray-400">
                                    per {item.unit}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 italic">
                        * Market rates are average prices observed on Khet Bazaar in the last 24 hours.
                    </p>
                </div>
            </div>
        </section>
    );
}
