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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signup: (data: any) => Promise<void>; // Deprecated in favor of Server Actions
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    const getUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            // Fetch profile
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                getUser();
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const refreshProfile = async () => {
        await getUser();
    };

    const login = async (email: string) => {
        // No-op: Login is handled by Server Actions
        console.warn("AuthContext.login is deprecated. Use Server Actions.");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshProfile }}>
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
