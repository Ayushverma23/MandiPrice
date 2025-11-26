import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-paper-cream text-text-ink border-t border-earth-green/10 py-8 mt-12">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="mailto:info@khetbazaar.com" className="hover:underline">
                                info@khetbazaar.com
                            </Link>
                        </li>
                        <li>
                            <Link href="tel:+919999999999" className="hover:underline">
                                +91 99999 99999
                            </Link>
                        </li>
                        <li>123 Farm Road, Patna, Bihar, India</li>
                    </ul>
                </div>
                {/* Help */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Help</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/help" className="hover:underline">
                                FAQ & Support
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
