import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-earth-green text-white py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-serif font-bold text-accent-gold mb-4">Khet Bazaar</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Connecting farmers directly with buyers for a fair and transparent agricultural marketplace.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li><Link href="/" className="hover:text-accent-gold transition-colors">Home</Link></li>
                            <li><Link href="/mandis" className="hover:text-accent-gold transition-colors">Mandis</Link></li>
                            <li><Link href="/about" className="hover:text-accent-gold transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-accent-gold transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">For Users</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li><Link href="/login" className="hover:text-accent-gold transition-colors">Login</Link></li>
                            <li><Link href="/signup" className="hover:text-accent-gold transition-colors">Register</Link></li>
                            <li><Link href="/dashboard/farmer" className="hover:text-accent-gold transition-colors">Farmer Dashboard</Link></li>
                            <li><Link href="/help" className="hover:text-accent-gold transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-center gap-2">
                                <span>📍</span> Patna, Bihar, India
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📧</span> support@khetbazaar.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span> +91 123 456 7890
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Khet Bazaar. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
