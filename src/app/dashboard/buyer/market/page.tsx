"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { Search, Filter, MapPin, Tag, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { getAllListings, Listing, initiateNegotiation } from "@/services/marketData";
import { useCart } from "@/context/CartContext";
import NegotiationModal from "@/components/organisms/NegotiationModal";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "@/components/molecules/ErrorBoundary";

export default function MarketplacePage() {
    const router = useRouter();
    const { addToCart, removeFromCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useCart();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDistrict, setSelectedDistrict] = useState("All");
    const [listings, setListings] = useState<(Listing & { farmerName: string, district: string, category: string })[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Negotiation State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<(Listing & { farmerName: string }) | null>(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const data = await getAllListings();
                setListings(data);
            } catch (error) {
                console.error("Failed to fetch listings", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchListings();
    }, []);

    const filteredListings = listings.filter(item => {
        const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesDistrict = selectedDistrict === "All" || item.district === selectedDistrict;

        return matchesSearch && matchesCategory && matchesDistrict;
    });

    const handleContactClick = (listing: Listing & { farmerName: string }) => {
        setSelectedListing(listing);
        setIsModalOpen(true);
    };

    const handleNegotiationSubmit = async (price: number, message: string) => {
        if (!selectedListing) return;
        try {
            await initiateNegotiation(selectedListing.id, selectedListing.quantity, price, message);
            setIsModalOpen(false);
            router.push('/dashboard/buyer/orders'); // Redirect to orders to see the pending negotiation
        } catch (error) {
            console.error("Failed to submit negotiation", error);
            alert("Failed to submit offer. Please try again.");
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Marketplace</h1>
                <p className="text-gray-500">Browse and purchase fresh produce directly from farmers.</p>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8 sticky top-4 z-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search crops, farmers..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-earth-green focus:ring-1 focus:ring-earth-green outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                        <select
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-earth-green outline-none"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Grains">Grains</option>
                            <option value="Oilseeds">Oilseeds</option>
                        </select>

                        <select
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-earth-green outline-none"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            <option value="All">All Districts</option>
                            <option value="Patna">Patna</option>
                            <option value="Gaya">Gaya</option>
                            <option value="Muzaffarpur">Muzaffarpur</option>
                            <option value="Nalanda">Nalanda</option>
                            <option value="Buxar">Buxar</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <ErrorBoundary>
                {isLoading ? (
                    <div className="text-center py-12">Loading listings...</div>
                ) : filteredListings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No listings found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredListings.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="relative h-48 w-full bg-gray-100">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.crop}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-earth-green shadow-sm">
                                        {item.category}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-text-ink">{item.crop}</h3>
                                            <p className="text-sm text-gray-500">{item.quantity} Quintals</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-earth-green text-lg">₹{item.price}/qtl</p>
                                            <p className="text-xs text-gray-400">approx.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {item.district}, Bihar
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                                {item.farmerName.charAt(0)}
                                            </div>
                                            <div className="text-xs">
                                                <p className="font-medium text-text-ink">{item.farmerName}</p>
                                                <p className="text-gray-400">Farmer</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    isInWishlist(item.id) ? removeFromWishlist(item.id) : addToWishlist(item.id);
                                                }}
                                                className={`p-2 rounded-full transition-colors ${isInWishlist(item.id)
                                                    ? 'bg-red-50 text-red-500'
                                                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <Heart className={`w-4 h-4 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    isInCart(item.id) ? removeFromCart(item.id) : addToCart(item.id);
                                                }}
                                                className={`p-2 rounded-full transition-colors ${isInCart(item.id)
                                                    ? 'bg-earth-green/10 text-earth-green'
                                                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleContactClick(item)}
                                                className="px-4 py-2 bg-earth-green text-white text-sm font-medium rounded-lg hover:bg-earth-green/90 transition-colors"
                                            >
                                                Negotiate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ErrorBoundary>

            {selectedListing && (
                <NegotiationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    currentPrice={selectedListing.price}
                    orderId={selectedListing.id} // Passing listing ID as orderId for now, but modal treats it as reference
                    onSubmitOffer={handleNegotiationSubmit}
                />
            )}
        </DashboardLayout>
    );
}
