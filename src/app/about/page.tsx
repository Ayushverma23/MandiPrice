import Header from '@/components/organisms/Header';
import '@/app/globals.css';

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="max-w-4xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold text-earth-green mb-6">About Khet‑Bazaar</h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-text-ink mb-4">Our Mission</h2>
                    <p className="text-base text-text-ink/80 leading-relaxed">
                        Khet‑Bazaar is a community‑driven platform that connects farmers directly with buyers,
                        enabling transparent price discovery and reducing middle‑man overhead. By leveraging
                        real‑time market data and a simple, mobile‑first UI, we empower small‑scale growers to
                        make informed decisions and reach broader markets.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-text-ink mb-4">Key Features</h2>
                    <ul className="list-disc list-inside text-base text-text-ink/80 space-y-2">
                        <li>Live price ticker for major commodities.</li>
                        <li>Mandis (marketplaces) overview with searchable listings.</li>
                        <li>Farmer dashboard for managing produce, tracking sales, and viewing payments.</li>
                        <li>Secure authentication via Supabase.</li>
                        <li>Responsive design with a premium look and feel.</li>
                    </ul>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-text-ink mb-4">Technology Stack</h2>
                    <p className="text-base text-text-ink/80 leading-relaxed">
                        The application is built with Next.js (React) and TypeScript, styled using vanilla CSS
                        with a custom design system (colors like <code className="bg-paper-cream px-1 rounded">bg-paper-cream</code>,
                        <code className="bg-paper-cream px-1 rounded">text-earth-green</code>, etc.). Supabase provides the backend
                        authentication and database layer.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold text-text-ink mb-4">Get Involved</h2>
                    <p className="text-base text-text-ink/80 leading-relaxed">
                        We welcome volunteers, developers, and agricultural experts to contribute. Feel free to
                        explore the codebase, submit issues, or join our community channels.
                    </p>
                </section>
            </main>
        </>
    );
}
