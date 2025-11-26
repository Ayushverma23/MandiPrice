"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export type UserRole = 'farmer' | 'arthiya' | 'buyer';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    district?: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string) => Promise<void>; // Deprecated in favor of Server Actions
    signup: (data: any) => Promise<void>; // Deprecated in favor of Server Actions
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // Fetch profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (profile) {
                    setUser({
                        id: profile.id,
                        name: profile.full_name,
                        email: profile.email,
                        role: profile.role as UserRole,
                        district: profile.district,
                        phone: profile.phone_number
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                // We could refetch profile here, but for now let's rely on the initial fetch
                // or a separate refresh if needed. 
                // Simple approach: just re-run getUser logic if we want to be safe, 
                // but onAuthStateChange fires frequently.
                // Let's just reload the page on sign in/out to be clean if needed, 
                // or let the useEffect handle it if the component remounts.
                // For now, we'll just let the getUser handle the initial load.
                // If we want real-time updates, we'd need to fetch profile here too.

                // Actually, let's just call getUser() again to be safe and simple
                getUser();
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string) => {
        // No-op: Login is handled by Server Actions
        console.warn("AuthContext.login is deprecated. Use Server Actions.");
    };

    const signup = async (data: any) => {
        // No-op: Signup is handled by Server Actions
        console.warn("AuthContext.signup is deprecated. Use Server Actions.");
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.refresh();
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
