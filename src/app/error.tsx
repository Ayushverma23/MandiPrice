"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                    Something went wrong!
                </h2>
                <p className="text-gray-500 mb-8">
                    We apologize for the inconvenience. An unexpected error has occurred.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Go Home
                    </button>
                    <button
                        onClick={reset}
                        className="px-6 py-2.5 bg-earth-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
