import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

// Define proper types for your user and order
interface User {
    id?: string;
    phone?: string;
    // Add other user properties you expect from your API
    [key: string]: any; // Fallback for other properties
}

interface Order {
    orderId?: string;
    items?: Array<any>;
    totalPrice?: number;
    // Add other order properties
    [key: string]: any; // Fallback for other properties
}

interface AuthState {
    user: User | null;
    currentOrder: Order | null;
    setUser: (user: User) => void;
    setCurrentOrder: (order: Order) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            currentOrder: null,
            setUser: (data) => {
                // Add validation if needed
                if (!data) {
                    console.warn('Attempting to set null user data');
                    return;
                }
                set({ user: data });
            },
            setCurrentOrder: (order) => {
                // Add validation if needed
                if (!order) {
                    console.warn('Attempting to set null order data');
                    return;
                }
                set({ currentOrder: order });
            },
            logout: () => {
                set({ user: null, currentOrder: null });
                // You might want to clear other state or storage here
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvStorage),
            // Optional: Add version control
            version: 1,
            // Optional: Add migration handling
            onRehydrateStorage: () => (state) => {
                console.log('State hydrated:', state?.user ? 'User present' : 'No user');
            },
        }
    )
);