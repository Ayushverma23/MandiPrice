'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function RealtimeNotifications() {
    const { user } = useAuth();
    const { success } = useToast();
    const supabase = createClient();

    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel('realtime-notifications')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders',
                    filter: `seller_id=eq.${user.id}`,
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        success('New order received!');
                    } else if (payload.eventType === 'UPDATE') {
                        // @ts-ignore
                        const newStatus = payload.new.status;
                        success(`Order status updated to ${newStatus}`);
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `buyer_id=eq.${user.id}`,
                },
                (payload) => {
                    // @ts-ignore
                    const newStatus = payload.new.status;
                    success(`Order status updated to ${newStatus}`);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, supabase, success]);

    return null;
}
