import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sellory - Marketplace Modern untuk UMKM Indonesia",
    template: "%s | Sellory",
  },
  description:
    "Sellory adalah platform marketplace modern untuk UMKM Indonesia. Jual beli lebih mudah, cepat, dan terpercaya.",
  keywords: ["marketplace", "belanja online", "umkm", "toko online", "e-commerce", "Indonesia"],
  authors: [{ name: "Sellory" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sellory.id",
    title: "Sellory - Marketplace Modern untuk UMKM Indonesia",
    description: "Platform e-commerce terpercaya untuk UMKM Indonesia",
    siteName: "Sellory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sellory - Marketplace Modern untuk UMKM Indonesia",
    description: "Platform e-commerce terpercaya untuk UMKM Indonesia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans bg-gray-50 antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
