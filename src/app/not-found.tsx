"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPinOff, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPinOff className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-500 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-2.5 bg-earth-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
