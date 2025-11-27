import React from 'react';

const features = [
    {
        title: "Fair Prices",
        description: "Get real-time mandi rates and sell your produce at the best market price.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        ),
    },
    {
        title: "Direct Access",
        description: "Connect directly with verified buyers and eliminate unnecessary middlemen.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 5.472m0 0a9.09 9.09 0 0 0-3.261-.423 3 3 0 0 0-4.614 2.72M6 18.719a5.976 5.976 0 0 1 .84-3.2M6 18.719A11.969 11.969 0 0 0 12 21c2.27 0 4.416-.607 6.33-1.684" />
            </svg>
        ),
    },
    {
        title: "Fresh Produce",
        description: "Buyers get farm-fresh quality directly from the source.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <section className="py-20 bg-earth-green text-paper-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-accent-gold">
                        Why Choose Khet Bazaar?
                    </h2>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">
                        Empowering farmers and connecting buyers through technology and transparency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                            <div className="bg-accent-gold/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-accent-gold mx-auto">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                            <p className="text-center opacity-80 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
