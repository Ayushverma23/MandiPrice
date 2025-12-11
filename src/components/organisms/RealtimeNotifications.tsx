'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function RealtimeNotifications() {
    const { user } = useAuth();
    const { success, info } = useToast();
    const supabase = createClient();

    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel('realtime-notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    const newNotification = payload.new;
                    // Play a sound or show a specific toast based on type
                    if (newNotification.type === 'order') {
                        success(newNotification.title);
                    } else {
                        info(newNotification.title);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, supabase, success, info]);

    return null;
}
