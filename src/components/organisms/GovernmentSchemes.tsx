import React from 'react';

const schemes = [
    {
        title: "PM-KISAN",
        fullTitle: "Pradhan Mantri Kisan Samman Nidhi",
        description: "Get ₹6,000 per year directly into your bank account in three installments.",
        link: "https://pmkisan.gov.in/",
        color: "bg-green-50 text-green-700 border-green-200"
    },
    {
        title: "PMFBY",
        fullTitle: "Pradhan Mantri Fasal Bima Yojana",
        description: "Crop insurance scheme to protect against losses due to natural calamities.",
        link: "https://pmfby.gov.in/",
        color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
        title: "Soil Health Card",
        fullTitle: "Swasth Dharaa, Khet Haraa",
        description: "Get your soil tested and receive a card with nutrient status and fertilizer recommendations.",
        link: "https://soilhealth.dac.gov.in/",
        color: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
        title: "e-NAM",
        fullTitle: "National Agriculture Market",
        description: "A pan-India electronic trading portal networking existing APMC mandis.",
        link: "https://enam.gov.in/",
        color: "bg-purple-50 text-purple-700 border-purple-200"
    }
];

export default function GovernmentSchemes() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-serif font-bold text-text-ink mb-3">
                            Government Schemes for You
                        </h2>
                        <p className="text-gray-600">
                            Stay updated with the latest government initiatives designed to support farmers.
                            Don&apos;t miss out on your benefits.
                        </p>
                    </div>
                    <a
                        href="https://agricoop.nic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-earth-green font-semibold hover:text-soil-brown transition-colors flex items-center gap-1"
                    >
                        View All Schemes
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {schemes.map((scheme, index) => (
                        <div key={index} className="p-6 rounded-xl border border-earth-green/10 bg-paper-cream hover:border-accent-gold/50 hover:shadow-md transition-all flex flex-col h-full group">
                            <h3 className="text-xl font-serif font-bold mb-1 text-earth-green group-hover:text-soil-brown transition-colors">{scheme.title}</h3>
                            <p className="text-xs font-bold text-soil-brown/80 mb-4 uppercase tracking-wide">{scheme.fullTitle}</p>
                            <p className="text-sm text-text-ink/80 mb-6 flex-grow leading-relaxed">
                                {scheme.description}
                            </p>
                            <a
                                href={scheme.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full py-2.5 bg-white border border-earth-green/20 rounded-lg text-sm font-semibold text-earth-green hover:bg-earth-green hover:text-white transition-all"
                            >
                                Visit Official Portal
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
