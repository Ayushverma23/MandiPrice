export default function PriceComparison() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-text-ink mb-6">Price Discovery</h3>

            <div className="space-y-6">
                {/* Item 1 */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Maize (Makka)</span>
                        <span className="text-gray-500">Per Quintal</span>
                    </div>
                    <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden flex">
                        {/* MSP */}
                        <div className="h-full bg-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-800" style={{ width: '30%' }}>
                            MSP ₹2090
                        </div>
                        {/* Mandi Price */}
                        <div className="h-full bg-green-200 flex items-center justify-center text-[10px] font-bold text-green-800" style={{ width: '40%' }}>
                            Mandi ₹2200
                        </div>
                        {/* Your Price */}
                        <div className="h-full bg-orange-200 flex items-center justify-center text-[10px] font-bold text-orange-800" style={{ width: '30%' }}>
                            You ₹2150
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        Current Mandi price is <span className="text-green-600 font-bold">5% higher</span> than MSP.
                    </p>
                </div>

                {/* Item 2 */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Wheat</span>
                        <span className="text-gray-500">Per Quintal</span>
                    </div>
                    <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-800" style={{ width: '40%' }}>
                            MSP ₹2125
                        </div>
                        <div className="h-full bg-green-200 flex items-center justify-center text-[10px] font-bold text-green-800" style={{ width: '35%' }}>
                            Mandi ₹2300
                        </div>
                        <div className="h-full bg-orange-200 flex items-center justify-center text-[10px] font-bold text-orange-800" style={{ width: '25%' }}>
                            You ₹2400
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
