"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Store,
  User,
  LogOut,
  Package,
  Heart,
  Settings,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCompact } from "@/lib/utils";

export default function Navbar() {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top strip */}
      <div className="bg-emerald-600 text-white text-xs py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            Gratis ongkir min. Rp 50.000 ke seluruh Indonesia
          </span>
          <div className="flex items-center gap-4">
            <Link href="/seller/dashboard" className="hover:underline flex items-center gap-1">
              <Store size={12} /> Buka Toko
            </Link>
            <Link href="#" className="hover:underline">Bantuan</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">
                sellory
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="flex-1 hidden md:flex max-w-2xl">
            <div className="flex w-full rounded-xl border-2 border-emerald-500 overflow-hidden focus-within:border-emerald-600 transition-colors bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk, toko, atau kategori..."
                className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-700 placeholder:text-gray-400"
                id="navbar-search-input"
              />
              <button
                className="bg-emerald-500 hover:bg-emerald-600 transition-colors px-5 flex items-center gap-2 text-white text-sm font-medium"
                id="navbar-search-btn"
              >
                <Search size={16} />
                <span className="hidden lg:inline">Cari</span>
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
              id="navbar-cart-btn"
            >
              <ShoppingCart size={22} className="text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Notification */}
            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors hidden md:flex" id="navbar-notif-btn">
              <Bell size={22} className="text-gray-700" />
            </button>

            {/* User menu */}
            <div className="relative flex items-center gap-2">
              <Link 
                href="/login" 
                className="hidden md:flex items-center justify-center px-4 py-2 border-2 border-emerald-500 text-emerald-600 font-bold rounded-xl text-sm hover:bg-emerald-50 transition-colors"
                id="navbar-login-btn"
              >
                Masuk
              </Link>
              <Link 
                href="/register" 
                className="hidden md:flex items-center justify-center px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl text-sm hover:bg-emerald-600 transition-colors"
                id="navbar-register-btn"
              >
                Daftar
              </Link>
              
              {/* Fallback mobile account icon that goes to login */}
              <Link
                href="/login"
                className="md:hidden flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-xl transition-colors"
                id="navbar-mobile-user-btn"
              >
                <User size={22} className="text-gray-700" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors md:hidden"
              id="navbar-mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="flex rounded-xl border-2 border-emerald-500 overflow-hidden">
            <input
              type="text"
              placeholder="Cari produk..."
              className="flex-1 px-4 py-2.5 text-sm outline-none"
              id="navbar-mobile-search"
            />
            <button className="bg-emerald-500 px-4 text-white" id="navbar-mobile-search-btn">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {[
            { href: "/", label: "Beranda" },
            { href: "/cart", label: `Keranjang (${formatCompact(itemCount)})` },
            { href: "/seller/dashboard", label: "Dashboard Penjual" },
            { href: "/admin/dashboard", label: "Admin Panel" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm text-gray-700 font-medium"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
