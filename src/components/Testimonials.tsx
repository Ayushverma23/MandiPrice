import React from 'react';

const testimonials = [
    {
        quote: "Khet Bazaar has transformed how I sell my wheat. I get better rates and don't have to wait for payments.",
        author: "Ram Kumar",
        role: "Farmer, Patna",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
        quote: "Sourcing fresh vegetables for my restaurant has never been easier. The quality is unmatched.",
        author: "Priya Singh",
        role: "Restaurant Owner, Gaya",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
        quote: "The transparency in pricing helps me make informed decisions. A must-have app for every farmer.",
        author: "Suresh Yadav",
        role: "Farmer, Muzaffarpur",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-white text-text-ink">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-earth-green">
                        Voices of Trust
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Hear from the community that powers Khet Bazaar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-paper-cream p-8 rounded-2xl border border-earth-green/10 hover:border-accent-gold/50 transition-colors shadow-sm hover:shadow-md">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={item.image}
                                    alt={item.author}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-accent-gold"
                                />
                                <div>
                                    <h4 className="font-bold text-lg text-earth-green">{item.author}</h4>
                                    <p className="text-sm text-soil-brown font-medium">{item.role}</p>
                                </div>
                            </div>
                            <p className="text-text-ink/80 font-serif italic leading-relaxed text-lg">
                                "{item.quote}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
