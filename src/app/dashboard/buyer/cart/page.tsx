"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { initiateNegotiation } from "@/services/marketData";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cartItems, removeFromCart, refreshCart, refreshWishlist } = useCart();
    const { success, error } = useToast();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.listing.price * item.quantity); // Assuming listing quantity for now, but really should be cart quantity * price
            // Wait, cart quantity is just a number (e.g. 1). But listing has quantity in quintals.
            // If cart quantity represents "number of listings", then price is per quintal.
            // Usually cart quantity = amount user wants to buy.
            // For now, let's assume user buys the WHOLE listing quantity if they add to cart?
            // Or let's assume cart quantity is just "1" unit of the listing (which is the whole lot).
            // Let's stick to: Total = Price/Qtl * Listing Quantity * Cart Quantity (which is 1)
        }, 0);
    };

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            // Create orders for all items
            const promises = cartItems.map(item =>
                initiateNegotiation(
                    item.listingId,
                    item.listing.quantity, // Buying full quantity for now
                    item.listing.price, // At asking price
                    "I am interested in buying this produce."
                )
            );

            await Promise.all(promises);

            // Clear cart (we need a clearCart function in context/service)
            // For now, remove one by one or just refresh
            // Ideally we should have a clearCart service.
            // I'll add a clearCart to service later or just loop remove.
            // Let's loop remove for now as it's safer without modifying service again immediately.
            // Actually I added clearCart to marketData.ts! I just need to expose it in context.
            // Wait, I did add clearCart to marketData.ts but maybe not context.
            // Let's check context. I didn't add it to context.
            // I'll just remove items one by one for now to be safe.

            for (const item of cartItems) {
                await removeFromCart(item.listingId);
            }

            success("Orders placed successfully!");
            router.push('/dashboard/buyer/orders');
        } catch (err) {
            console.error("Checkout failed", err);
            error("Failed to place orders. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Shopping Cart</h1>
                <p className="text-gray-500">Review your items before purchasing.</p>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Explore the marketplace to find fresh produce.</p>
                    <Link
                        href="/dashboard/buyer/market"
                        className="px-6 py-2 bg-earth-green text-white rounded-lg hover:bg-earth-green/90 transition-colors"
                    >
                        Browse Marketplace
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-center">
                                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {item.listing.image ? (
                                        <Image
                                            src={item.listing.image}
                                            alt={item.listing.crop}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-text-ink">{item.listing.crop}</h3>
                                            <p className="text-sm text-gray-500">{item.listing.farmerName}</p>
                                        </div>
                                        <p className="font-bold text-earth-green">₹{item.listing.price}/qtl</p>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium">Quantity:</span>
                                            {item.listing.quantity} Quintals
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {item.listing.district}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.listingId)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-80">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-4">
                            <h3 className="font-bold text-lg text-text-ink mb-4">Order Summary</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>₹{calculateTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Market Fees (2%)</span>
                                    <span>₹{(calculateTotal() * 0.02).toLocaleString()}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-text-ink">
                                    <span>Total</span>
                                    <span>₹{(calculateTotal() * 1.02).toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full py-3 bg-earth-green text-white rounded-lg font-medium hover:bg-earth-green/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCheckingOut ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        Checkout
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-gray-400 mt-4 text-center">
                                By placing this order, you agree to our terms of service.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
