"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X, Info } from "lucide-react";
import { useEffect } from "react";

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm min-w-[300px] max-w-md ${type === 'success'
                ? 'bg-white/90 border-green-200 text-green-800'
                : type === 'error'
                    ? 'bg-white/90 border-red-200 text-red-800'
                    : 'bg-white/90 border-blue-200 text-blue-800'
                }`}
        >
            {type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
            ) : type === 'error' ? (
                <XCircle className="w-5 h-5 text-red-500 shrink-0" />
            ) : (
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
            )}
            <p className="text-sm font-medium flex-1">{message}</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
