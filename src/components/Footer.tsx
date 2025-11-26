import Link from 'next/link';
import { Twitter, Facebook, X, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-paper-cream text-text-ink border-t border-earth-green/10 py-8 mt-12">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <ul className="space-y-2 text-sm flex flex-col space-y-4">
                        <li>
                            <Link href="https://twitter.com/YourHandle" className="hover:underline flex items-center gap-2">
                                <Twitter className="w-5 h-5" />
                                Twitter
                            </Link>
                        </li>
                        <li>
                            <Link href="https://facebook.com/YourPage" className="hover:underline flex items-center gap-2">
                                <Facebook className="w-5 h-5" />
                                Facebook
                            </Link>
                        </li>
                        <li>
                            <Link href="https://x.com/YourHandle" className="hover:underline flex items-center gap-2">
                                <X className="w-5 h-5" />
                                X
                            </Link>
                        </li>
                        <li>
                            <Link href="https://linkedin.com/in/YourProfile" className="hover:underline flex items-center gap-2">
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Help */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Help</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/help" className="hover:underline">
                                FAQ &amp; Support
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">
                                Contact Support
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Consumer's Policy */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Consumer's Policy</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/privacy" className="hover:underline">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:underline">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/refund" className="hover:underline">
                                Refund Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 text-center text-xs text-text-ink/60">
                © {new Date().getFullYear()} Khet‑Bazaar. All rights reserved.
            </div>
        </footer>
    );
}
