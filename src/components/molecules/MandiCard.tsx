import { MapPin, TrendingUp } from "lucide-react";
import { MarketUpdate } from "@/services/marketData";

interface MandiCardProps {
    data: MarketUpdate;
}

export default function MandiCard({ data }: MandiCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-earth-green/10 rounded-lg text-earth-green group-hover:bg-earth-green group-hover:text-white transition-colors">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-text-ink">{data.mandiName}</h3>
                        <p className="text-sm text-gray-500">{data.district}, Bihar</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-3 bg-paper-cream rounded-lg border border-earth-green/10">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Top Crop</span>
                    <span className="text-xs font-medium text-earth-green flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        High Demand
                    </span>
                </div>
                <div className="flex justify-between items-end">
                    <span className="font-medium text-text-ink">{data.crop}</span>
                    <span className="font-bold text-earth-green">₹{data.price}/q</span>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium text-earth-green border border-earth-green/20 rounded-lg hover:bg-earth-green/5 transition-colors">
                    View Details
                </button>
                <button className="flex-1 py-2 text-sm font-medium text-white bg-earth-green rounded-lg hover:bg-opacity-90 transition-colors">
                    Get Directions
                </button>
            </div>
        </div>
    );
}
