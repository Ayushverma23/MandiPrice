import React, { useState } from 'react';
import { X, MessageCircle, Check, XCircle } from 'lucide-react';

interface NegotiationModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPrice: number;
    orderId: string;
    onSubmitOffer: (price: number, message: string) => void;
}

export default function NegotiationModal({ isOpen, onClose, currentPrice, orderId, onSubmitOffer }: NegotiationModalProps) {
    const [offerPrice, setOfferPrice] = useState(currentPrice);
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitOffer(offerPrice, message);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-text-ink flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-earth-green" />
                        Negotiate Price
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="bg-paper-cream p-4 rounded-lg border border-earth-green/10">
                        <p className="text-sm text-gray-500 mb-1">Current Price</p>
                        <p className="text-2xl font-bold text-earth-green">₹{currentPrice}/Q</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Counter Offer (₹/Q)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
                            <input
                                type="number"
                                required
                                min="1"
                                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green"
                            rows={3}
                            placeholder="Reason for price change..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-earth-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                        >
                            Send Offer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
