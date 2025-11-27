import React from 'react';

export default function HowItWorks() {
    return (
        <section className="py-20 bg-paper-cream text-text-ink">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-earth-green">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Simple steps to get started, whether you are selling or buying.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* For Farmers */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-soil-brown flex items-center gap-3">
                            <span className="bg-soil-brown text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                            For Farmers
                        </h3>
                        <div className="space-y-8 relative pl-8 border-l-2 border-soil-brown/20">
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 bg-white border-2 border-soil-brown w-6 h-6 rounded-full"></span>
                                <h4 className="text-xl font-semibold mb-2">List Your Produce</h4>
                                <p className="text-gray-600">Create a sell request with details about your crop, quantity, and expected price.</p>
                            </div>
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 bg-white border-2 border-soil-brown w-6 h-6 rounded-full"></span>
                                <h4 className="text-xl font-semibold mb-2">Get Verified</h4>
                                <p className="text-gray-600">Our team verifies your listing to ensure quality and trust for buyers.</p>
                            </div>
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 bg-white border-2 border-soil-brown w-6 h-6 rounded-full"></span>
                                <h4 className="text-xl font-semibold mb-2">Receive Payments</h4>
                                <p className="text-gray-600">Connect with buyers and receive secure payments directly to your account.</p>
                            </div>
                        </div>
                    </div>

                    {/* For Buyers */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-earth-green flex items-center gap-3">
                            <span className="bg-earth-green text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                            For Buyers
                        </h3>
                        <div className="space-y-8 relative pl-8 border-l-2 border-earth-green/20">
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 bg-white border-2 border-earth-green w-6 h-6 rounded-full"></span>
                                <h4 className="text-xl font-semibold mb-2">Browse Listings</h4>
                                <p className="text-gray-600">Explore a wide variety of fresh produce listed directly by farmers.</p>
                            </div>
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 bg-white border-2 border-earth-green w-6 h-6 rounded-full"></span>
                                <h4 className="text-xl font-semibold mb-2">Place Orders</h4>
                                <p className="text-gray-600">Select the produce you need and place bulk orders easily.</p>
                            </div>
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 bg-white border-2 border-earth-green w-6 h-6 rounded-full"></span>
                                <h4 className="text-xl font-semibold mb-2">Track Delivery</h4>
                                <p className="text-gray-600">Stay updated on your order status until it reaches your doorstep.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
