import Header from "@/components/organisms/Header";
import Hero from "@/components/organisms/Hero";
import PriceTicker from "@/components/molecules/PriceTicker";
import MarketCard from "@/components/molecules/MarketCard";
import Features from "@/components/organisms/Features";
import HowItWorks from "@/components/organisms/HowItWorks";
import MSPComparison from "@/components/organisms/MSPComparison";
import GovernmentSchemes from "@/components/organisms/GovernmentSchemes";
import { getLivePrices } from "@/services/marketData";

export default async function Home() {
  const marketData = await getLivePrices();

  return (
    <main className="min-h-screen flex flex-col">
      <PriceTicker />
      <Header />
      <Hero />

      <MSPComparison />
      <GovernmentSchemes />
      <Features />

      {/* Live Market Section */}
      <section id="live-market" className="py-20 px-4 text-center bg-white">
        <h2 className="text-3xl font-serif font-bold text-text-ink mb-4">
          Live Market Updates
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Real-time data from over 150 mandis across Bihar.
          Select your district to see local prices.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {marketData.map((item) => (
            <MarketCard key={item.id} data={item} />
          ))}
        </div>
      </section>

      <HowItWorks />
    </main>
  );
}
