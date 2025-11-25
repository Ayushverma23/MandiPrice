import Link from "next/link";
import { Sprout } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full py-4 px-6 bg-paper-cream border-b border-earth-green/10 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center gap-2 text-earth-green">
                <Sprout className="w-6 h-6" />
                <span className="text-xl font-serif font-bold tracking-tight">Khet-Bazaar</span>
            </div>

            <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-text-ink/80">
                <Link href="/" className="hover:text-earth-green transition-colors">Home</Link>
                <Link href="#" className="hover:text-earth-green transition-colors">Mandis</Link>
                <Link href="#" className="hover:text-earth-green transition-colors">Trends</Link>
                <Link href="#" className="hover:text-earth-green transition-colors">About</Link>
            </nav>

            <div className="flex items-center gap-4">
                <button className="text-sm font-medium hover:text-earth-green transition-colors">
                    Login
                </button>
                <button className="px-4 py-2 bg-earth-green text-white text-sm font-medium rounded-full hover:bg-opacity-90 transition-all">
                    Join as Volunteer
                </button>
            </div>
        </header>
    );
}
