"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
    getCart,
    getWishlist,
    addToCart as addToCartService,
    removeFromCart as removeFromCartService,
    addToWishlist as addToWishlistService,
    removeFromWishlist as removeFromWishlistService,
    CartItem,
    WishlistItem
} from '@/services/marketData';
import { useToast } from './ToastContext';

interface CartContextType {
    cartItems: CartItem[];
    wishlistItems: WishlistItem[];
    cartCount: number;
    wishlistCount: number;
    isLoading: boolean;
    addToCart: (listingId: string) => Promise<void>;
    removeFromCart: (listingId: string) => Promise<void>;
    addToWishlist: (listingId: string) => Promise<void>;
    removeFromWishlist: (listingId: string) => Promise<void>;
    refreshCart: () => Promise<void>;
    refreshWishlist: () => Promise<void>;
    isInWishlist: (listingId: string) => boolean;
    isInCart: (listingId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const { success, error } = useToast();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshCart = useCallback(async () => {
        if (!user) {
            setCartItems([]);
            return;
        }
        try {
            const data = await getCart();
            setCartItems(data);
        } catch (err) {
            console.error("Failed to fetch cart", err);
        }
    }, [user]);

    const refreshWishlist = useCallback(async () => {
        if (!user) {
            setWishlistItems([]);
            return;
        }
        try {
            const data = await getWishlist();
            setWishlistItems(data);
        } catch (err) {
            console.error("Failed to fetch wishlist", err);
        }
    }, [user]);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            await Promise.all([refreshCart(), refreshWishlist()]);
            setIsLoading(false);
        };
        init();
    }, [refreshCart, refreshWishlist]);

    const addToCart = async (listingId: string) => {
        if (!user) {
            error("Please login to add items to cart");
            return;
        }
        try {
            await addToCartService(listingId);
            await refreshCart();
            success("Added to cart");
        } catch (err) {
            console.error("Failed to add to cart", err);
            error("Failed to add to cart");
        }
    };

    const removeFromCart = async (listingId: string) => {
        try {
            await removeFromCartService(listingId);
            await refreshCart();
            success("Removed from cart");
        } catch (err) {
            console.error("Failed to remove from cart", err);
            error("Failed to remove from cart");
        }
    };

    const addToWishlist = async (listingId: string) => {
        if (!user) {
            error("Please login to use wishlist");
            return;
        }
        try {
            await addToWishlistService(listingId);
            await refreshWishlist();
            success("Added to wishlist");
        } catch (err) {
            console.error("Failed to add to wishlist", err);
            error("Failed to add to wishlist");
        }
    };

    const removeFromWishlist = async (listingId: string) => {
        try {
            await removeFromWishlistService(listingId);
            await refreshWishlist();
            success("Removed from wishlist");
        } catch (err) {
            console.error("Failed to remove from wishlist", err);
            error("Failed to remove from wishlist");
        }
    };

    const isInWishlist = (listingId: string) => {
        return wishlistItems.some(item => item.listingId === listingId);
    };

    const isInCart = (listingId: string) => {
        return cartItems.some(item => item.listingId === listingId);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            wishlistItems,
            cartCount: cartItems.length,
            wishlistCount: wishlistItems.length,
            isLoading,
            addToCart,
            removeFromCart,
            addToWishlist,
            removeFromWishlist,
            refreshCart,
            refreshWishlist,
            isInWishlist,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
