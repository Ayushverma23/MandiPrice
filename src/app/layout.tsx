import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import FooterWrapper from "@/components/FooterWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Khet-Bazaar",
  description: "Direct Farmer-to-Mandi Marketplace",
  icons: {
    icon: '/leaf-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-paper-cream text-text-ink`}>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
        <FooterWrapper />
      </body>
    </html>
  );
}
