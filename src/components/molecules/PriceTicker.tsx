"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const PRICES = [
    { name: "Potato (Aloo)", price: "₹12/kg", trend: "up" },
    { name: "Onion (Pyaaz)", price: "₹25/kg", trend: "down" },
    { name: "Tomato (Tamatar)", price: "₹40/kg", trend: "up" },
    { name: "Cauliflower (Gobi)", price: "₹15/pc", trend: "stable" },
    { name: "Litchi (Shahi)", price: "₹80/kg", trend: "down" },
    { name: "Wheat (Gehu)", price: "₹2100/qt", trend: "stable" },
    { name: "Rice (Chawal)", price: "₹3200/qt", trend: "up" },
];

export default function PriceTicker() {
    return (
        <div className="w-full bg-earth-green text-paper-cream py-2 overflow-hidden border-b-4 border-accent-gold">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: "-100%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {[...PRICES, ...PRICES, ...PRICES].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                            <span>{item.name}</span>
                            <span className="font-bold text-accent-gold">{item.price}</span>
                            {item.trend === "up" && <ArrowUp className="w-4 h-4 text-green-400" />}
                            {item.trend === "down" && <ArrowDown className="w-4 h-4 text-red-400" />}
                            {item.trend === "stable" && <Minus className="w-4 h-4 text-gray-400" />}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
