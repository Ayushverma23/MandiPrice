"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { getNotifications, markAsRead, markAllAsRead, Notification } from "@/services/notificationService";
import { Bell, Check, CheckCheck, ExternalLink, Package, CreditCard, MessageSquare, Info } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";

export default function NotificationsPage() {
    const { user } = useAuth();
    const { success } = useToast();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);

    const fetchNotifications = async () => {
        if (!user) return;
        const data = await getNotifications(user.id);
        setNotifications(data);
        setLoading(false);
    };

    const handleMarkAsRead = async (id: string) => {
        await markAsRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleMarkAllRead = async () => {
        if (!user) return;
        await markAllAsRead(user.id);
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        success("All notifications marked as read");
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'order': return <Package className="w-5 h-5 text-blue-600" />;
            case 'payment': return <CreditCard className="w-5 h-5 text-green-600" />;
            case 'negotiation': return <MessageSquare className="w-5 h-5 text-purple-600" />;
            default: return <Info className="w-5 h-5 text-gray-600" />;
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-text-ink">Notifications</h1>
                    <p className="text-gray-500">Stay updated with your orders and activities.</p>
                </div>
                {notifications.some(n => !n.read) && (
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-2 text-sm font-medium text-earth-green hover:underline"
                    >
                        <CheckCheck className="w-4 h-4" />
                        Mark all as read
                    </button>
                )}
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : notifications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Bell className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium text-text-ink">No notifications yet</h3>
                    <p className="text-gray-500">We'll notify you when something important happens.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`
                                relative p-6 rounded-xl border transition-all
                                ${notification.read ? 'bg-white border-gray-100' : 'bg-blue-50/50 border-blue-100 shadow-sm'}
                            `}
                        >
                            <div className="flex gap-4">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                    ${notification.read ? 'bg-gray-100' : 'bg-white shadow-sm'}
                                `}>
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className={`font-medium ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                                                {notification.title}
                                            </h3>
                                            <p className={`mt-1 text-sm ${notification.read ? 'text-gray-500' : 'text-blue-800/80'}`}>
                                                {notification.message}
                                            </p>
                                            <p className="mt-2 text-xs text-gray-400">
                                                {new Date(notification.createdAt).toLocaleDateString()} at {new Date(notification.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="p-2 text-blue-400 hover:bg-blue-100 rounded-full transition-colors"
                                                title="Mark as read"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    {notification.link && (
                                        <Link
                                            href={notification.link}
                                            onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                                            className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-earth-green hover:underline"
                                        >
                                            View Details
                                            <ExternalLink className="w-3 h-3" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
