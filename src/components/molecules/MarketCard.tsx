import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MarketUpdate } from "@/services/marketData";

interface MarketCardProps {
    data: MarketUpdate;
}

export default function MarketCard({ data }: MarketCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-serif font-bold text-lg text-text-ink">{data.crop}</h3>
                    <p className="text-sm text-gray-500">{data.mandiName}, {data.district}</p>
                </div>
                <div className={`p-2 rounded-full ${data.trend === 'up' ? 'bg-green-100 text-green-600' :
                        data.trend === 'down' ? 'bg-red-100 text-red-600' :
                            'bg-gray-100 text-gray-600'
                    }`}>
                    {data.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {data.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                    {data.trend === 'stable' && <Minus className="w-4 h-4" />}
                </div>
            </div>

            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-earth-green">₹{data.price}</span>
                <span className="text-sm text-gray-400">/ quintal</span>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 font-medium">
                <span>Updated {data.lastUpdated}</span>
                <span className="uppercase tracking-wider text-earth-green/80">Live</span>
            </div>
        </div>
    );
}
