"use client";

import {
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  AlertCircle,
  ShieldCheck,
  MoreVertical,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { revenueChartData } from "@/data/orders";
import { formatRupiah, formatCompact } from "@/lib/utils";

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "Total GMV (Gross Merchandise Value)",
      value: formatRupiah(8450000000),
      trend: "+24.5%",
      isUp: true,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Transaksi",
      value: "12.450",
      trend: "+12.2%",
      isUp: true,
      icon: ShoppingCart,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Seller Aktif",
      value: "1.240",
      trend: "+5.4%",
      isUp: true,
      icon: Store,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Pengguna Baru",
      value: "3.890",
      trend: "+18.2%",
      isUp: true,
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Platform Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Data performa marketplace secara keseluruhan.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Sistem Normal
          </div>
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-emerald-50 text-emerald-600">
                <ArrowUpRight size={14} />
                {stat.trend}
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">GMV Growth (30 Hari Terakhir)</h3>
            <select className="bg-gray-50 border-none text-sm rounded-lg px-3 py-1.5 outline-none font-medium text-gray-700 cursor-pointer">
              <option>Bulan Ini</option>
              <option>Bulan Lalu</option>
              <option>Tahun Ini</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  tickFormatter={(val) => `${formatCompact(val)}`}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  formatter={(val: any) => formatRupiah(val * 1000)} // Dummy multiplier for GMV
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 mb-5">Perhatian Khusus</h3>
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-900">5 Laporan Penipuan Baru</p>
                <p className="text-xs text-red-700 mt-1">Laporan terkait toko "Elektronik Murah" butuh peninjauan segera.</p>
                <button className="text-xs font-bold text-red-600 mt-2 hover:underline">Tinjau Sekarang</button>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
              <ShieldCheck size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-900">12 Toko Menunggu Verifikasi KYC</p>
                <p className="text-xs text-amber-700 mt-1">Dokumen KTP dan NIB siap untuk divalidasi admin.</p>
                <button className="text-xs font-bold text-amber-600 mt-2 hover:underline">Validasi</button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <Store size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-900">Pencairan Dana (Withdrawal)</p>
                <p className="text-xs text-blue-700 mt-1">45 permintaan penarikan dana seller hari ini tertunda.</p>
                <button className="text-xs font-bold text-blue-600 mt-2 hover:underline">Proses Pencairan</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Sellers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Top Seller (Minggu Ini)</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-5 py-3">Nama Toko</th>
                <th className="px-5 py-3">Total Pesanan</th>
                <th className="px-5 py-3">Total Omset</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: "Toko Elektronik Jaya", orders: 342, omset: 125000000, rating: 4.9, status: "Official" },
                { name: "Batik Nusantara", orders: 289, omset: 45000000, rating: 4.8, status: "Power Merchant" },
                { name: "Dapur Nusantara", orders: 412, omset: 38000000, rating: 4.9, status: "Power Merchant" },
                { name: "Sport Center ID", orders: 156, omset: 89000000, rating: 4.7, status: "Official" },
              ].map((seller, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold text-xs">
                      {seller.name.charAt(0)}
                    </div>
                    {seller.name}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{seller.orders}</td>
                  <td className="px-5 py-4 font-semibold text-emerald-600">
                    {formatRupiah(seller.omset)}
                  </td>
                  <td className="px-5 py-4 text-gray-600 flex items-center gap-1">
                    ⭐ {seller.rating}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                      {seller.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
