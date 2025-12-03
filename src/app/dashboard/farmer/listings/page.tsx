"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { getMyListings, updateListingStatus, Listing } from "@/services/marketData";
import { useAuth } from "@/context/AuthContext";
import { Edit2, Trash2, CheckCircle } from "lucide-react";

export default function MyListingsPage() {
    const { user } = useAuth();
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchListings = () => {
        if (user) {
            getMyListings(user.id).then(data => {
                setListings(data);
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        fetchListings();
    }, [user]);

    const handleMarkSold = async (id: string) => {
        await updateListingStatus(id, 'sold');
        fetchListings(); // Refresh list
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">My Listings (Apni Bikri)</h1>
                <p className="text-gray-500">Manage your active and sold crops.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Crop</th>
                            <th className="px-6 py-4 font-medium">Quantity</th>
                            <th className="px-6 py-4 font-medium">Price/Q</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {listings.map(listing => (
                            <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-text-ink">{listing.crop}</td>
                                <td className="px-6 py-4 text-gray-600">{listing.quantity} Q</td>
                                <td className="px-6 py-4 text-gray-600">₹{listing.price}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${listing.status === 'active' ? 'bg-green-100 text-green-800' :
                                            listing.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {listing.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{listing.datePosted}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    {listing.status === 'active' && (
                                        <button
                                            onClick={() => handleMarkSold(listing.id)}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Mark as Sold"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {listings.length === 0 && !loading && (
                    <div className="p-8 text-center text-gray-500">
                        No listings found. Start by creating a sell request.
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
