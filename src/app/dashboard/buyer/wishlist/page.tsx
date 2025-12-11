"use client";

import { useEffect } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Trash2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist, addToCart, refreshWishlist, isInCart } = useCart();

    useEffect(() => {
        refreshWishlist();
    }, [refreshWishlist]);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">My Wishlist</h1>
                <p className="text-gray-500">Items you&apos;re interested in for later.</p>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Explore the marketplace to find fresh produce.</p>
                    <Link
                        href="/dashboard/buyer/market"
                        className="px-6 py-2 bg-earth-green text-white rounded-lg hover:bg-earth-green/90 transition-colors"
                    >
                        Browse Marketplace
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="relative h-48 w-full bg-gray-100">
                                {item.listing.image ? (
                                    <Image
                                        src={item.listing.image}
                                        alt={item.listing.crop}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-earth-green shadow-sm">
                                    {item.listing.category || 'Vegetables'}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-text-ink">{item.listing.crop}</h3>
                                        <p className="text-sm text-gray-500">{item.listing.quantity} Quintals</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-earth-green text-lg">₹{item.listing.price}/qtl</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    {item.listing.district}, Bihar
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => addToCart(item.listingId)}
                                        disabled={isInCart(item.listingId)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isInCart(item.listingId)
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-earth-green text-white hover:bg-earth-green/90'
                                            }`}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        {isInCart(item.listingId) ? 'In Cart' : 'Add to Cart'}
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(item.listingId)}
                                        className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </DashboardLayout >
    );
}
