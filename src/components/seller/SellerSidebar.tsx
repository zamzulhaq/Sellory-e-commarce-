"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  Star,
  Settings,
  LogOut,
  Store,
  ChevronRight,
  Bell,
  Wallet,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/seller/dashboard" },
  { icon: Package, label: "Produk Saya", href: "/seller/products" },
  { icon: ShoppingCart, label: "Pesanan Masuk", href: "/seller/orders", badge: 3 },
  { icon: BarChart2, label: "Analitik", href: "/seller/analytics" },
  { icon: Star, label: "Ulasan", href: "/seller/reviews" },
  { icon: Wallet, label: "Keuangan", href: "/seller/finance" },
  { icon: Bell, label: "Notifikasi", href: "/seller/notifications" },
  { icon: Settings, label: "Pengaturan Toko", href: "/seller/settings" },
];

export default function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">S</span>
          </div>
          <span className="text-base font-black text-gray-900">sellory</span>
        </Link>

        {/* Seller info */}
        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Store size={18} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Toko Elektronik Jaya</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <p className="text-xs text-emerald-600 font-medium">Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Menu</p>
        {navItems.map(({ icon: Icon, label, href, badge }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={17} className={isActive ? "text-emerald-600" : "text-gray-400"} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
              {isActive && <ChevronRight size={14} className="text-emerald-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut size={17} className="text-gray-400" />
          Keluar dari Dashboard
        </Link>
      </div>
    </aside>
  );
}
