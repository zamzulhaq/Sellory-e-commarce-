"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingCart,
  BarChart2,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Flag,
  Tag,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Pengguna", href: "/admin/users" },
  { icon: Store, label: "Seller", href: "/admin/sellers" },
  { icon: ShoppingCart, label: "Transaksi", href: "/admin/transactions" },
  { icon: Tag, label: "Produk", href: "/admin/products" },
  { icon: BarChart2, label: "Laporan", href: "/admin/reports" },
  { icon: Flag, label: "Laporan Masalah", href: "/admin/complaints", badge: 5 },
  { icon: Shield, label: "Keamanan", href: "/admin/security" },
  { icon: Settings, label: "Pengaturan", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 text-white min-h-screen sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">S</span>
          </div>
          <span className="text-base font-black text-white">sellory</span>
        </Link>
        <p className="text-xs text-gray-400 ml-9 font-medium">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Menu Utama</p>
        {navItems.map(({ icon: Icon, label, href, badge }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-600/20 text-emerald-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={17} className={isActive ? "text-emerald-400" : "text-gray-500"} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
              {isActive && <ChevronRight size={14} className="text-emerald-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Shield size={14} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Admin Utama</p>
            <p className="text-xs text-gray-500">admin@sellory.id</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-800 hover:text-red-400 transition-colors"
        >
          <LogOut size={17} />
          Keluar
        </Link>
      </div>
    </aside>
  );
}
