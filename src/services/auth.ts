export type UserRole = 'farmer' | 'arthiya' | 'buyer';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    district?: string;
    phone?: string;
}

const STORAGE_KEY = 'khet_bazaar_user';

export const authService = {
    login: async (email: string): Promise<User> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock login logic - in reality this would verify credentials
        // For now, we return a mock user based on the email
        const mockUser: User = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
            role: 'farmer', // Default role for simple login, signup sets specific role
            district: 'Patna'
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
        return mockUser;
    },

    signup: async (data: Omit<User, 'id'>): Promise<User> => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser: User = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            ...data
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        return newUser;
    },

    logout: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        localStorage.removeItem(STORAGE_KEY);
    },

    getUser: (): User | null => {
        if (typeof window === 'undefined') return null;
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    }
};
