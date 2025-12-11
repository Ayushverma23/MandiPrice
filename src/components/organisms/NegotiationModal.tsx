import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Check, XCircle, User } from 'lucide-react';
import { Negotiation } from '@/services/marketData';

interface NegotiationModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPrice: number;
    orderId: string;
    onSubmitOffer: (price: number, message: string) => void;
    history?: Negotiation[];
}

export default function NegotiationModal({ isOpen, onClose, currentPrice, orderId, onSubmitOffer, history = [] }: NegotiationModalProps) {
    const [offerPrice, setOfferPrice] = useState(currentPrice);
    const [message, setMessage] = useState('');
    const historyEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            if (offerPrice !== currentPrice) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setOfferPrice(currentPrice);
            }
            // Scroll to bottom of history
            setTimeout(() => {
                historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [isOpen, currentPrice]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitOffer(offerPrice, message);
        setMessage(''); // Clear message after submit
        // Don't close immediately if we want to show the new message, but usually the parent handles refresh
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                    <h3 className="text-xl font-bold text-text-ink flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-earth-green" />
                        Negotiate Price
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* History Section */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
                    {history.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm">No negotiation history yet.</p>
                    ) : (
                        history.map((item) => (
                            <div key={item.id} className={`flex flex-col ${item.senderName === 'Me' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] rounded-lg p-3 ${item.senderName === 'Me'
                                    ? 'bg-earth-green text-white rounded-tr-none'
                                    : 'bg-white border border-gray-200 rounded-tl-none'
                                    }`}>
                                    <div className="flex justify-between items-baseline gap-4 mb-1">
                                        <span className={`text-xs font-bold ${item.senderName === 'Me' ? 'text-white/90' : 'text-earth-green'}`}>
                                            {item.senderName}
                                        </span>
                                        <span className={`text-xs ${item.senderName === 'Me' ? 'text-white/70' : 'text-gray-400'}`}>
                                            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold mb-1">Offered: ₹{item.offeredPrice}/Q</p>
                                    {item.message && <p className="text-sm opacity-90">{item.message}</p>}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={historyEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 shrink-0 bg-white border-t border-gray-100 rounded-b-xl">
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
                            rows={2}
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
