import { createClient } from "@/utils/supabase/client";

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'order' | 'payment' | 'system' | 'negotiation';
    read: boolean;
    link?: string;
    createdAt: string;
}

export const createNotification = async (
    userId: string,
    title: string,
    message: string,
    type: Notification['type'],
    link?: string
): Promise<void> => {
    const supabase = createClient();

    const { error } = await supabase
        .from('notifications')
        .insert({
            user_id: userId,
            title,
            message,
            type,
            link,
            read: false
        });

    if (error) {
        console.error('Error creating notification:', error);
        // Don't throw, just log. Notifications shouldn't break the main flow.
    }
};

export const getNotifications = async (userId: string): Promise<Notification[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }

    return data.map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        title: item.title,
        message: item.message,
        type: item.type,
        read: item.read,
        link: item.link,
        createdAt: item.created_at // Keep as ISO string for client formatting
    }));
};

export const markAsRead = async (notificationId: string): Promise<void> => {
    const supabase = createClient();

    const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

    if (error) {
        console.error('Error marking notification as read:', error);
    }
};

export const markAllAsRead = async (userId: string): Promise<void> => {
    const supabase = createClient();

    const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

    if (error) {
        console.error('Error marking all notifications as read:', error);
    }
};
