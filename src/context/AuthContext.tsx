"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, authService } from "@/services/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string) => Promise<void>;
    signup: (data: Omit<User, 'id'>) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            const storedUser = authService.getUser();
            if (storedUser) {
                setUser(storedUser);
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string) => {
        const user = await authService.login(email);
        setUser(user);
    };

    const signup = async (data: Omit<User, 'id'>) => {
        const user = await authService.signup(data);
        setUser(user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
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
