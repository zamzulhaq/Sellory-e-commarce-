"use client";

import {
  TrendingUp,
  Package,
  ShoppingCart,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueChartData, orders } from "@/data/orders";
import { formatRupiah, formatCompact, formatDate } from "@/lib/utils";
import Badge from "@/components/shared/Badge";

export default function SellerDashboardPage() {
  const stats = [
    {
      label: "Total Pendapatan",
      value: formatRupiah(42500000),
      trend: "+12.5%",
      isUp: true,
      icon: Wallet,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Pesanan",
      value: "142",
      trend: "+5.2%",
      isUp: true,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Produk",
      value: "45",
      trend: "0%",
      isUp: null,
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Konversi",
      value: "3.2%",
      trend: "-1.1%",
      isUp: false,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ringkasan performa toko Anda hari ini.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2 outline-none focus:border-emerald-500 text-gray-700">
            <option>7 Hari Terakhir</option>
            <option>30 Hari Terakhir</option>
            <option>Bulan Ini</option>
          </select>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm">
            Unduh Laporan
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
              {stat.isUp !== null && (
                <div
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${
                    stat.isUp
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </div>
              )}
            </div>
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Grafik Pendapatan</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueChartData}>
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
                  tickFormatter={(val) => formatCompact(val)}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  formatter={(val: any) => formatRupiah(val)}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#10b981", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Aktivitas Terbaru</h3>
            <button className="text-sm text-emerald-600 font-semibold hover:underline">
              Lihat Semua
            </button>
          </div>
          <div className="flex-1 space-y-4">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShoppingCart size={14} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    Pesanan baru dari <span className="font-semibold">{order.buyerName}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={12} /> {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Pesanan Masuk (Perlu Diproses)</h3>
          <button className="text-sm text-emerald-600 font-semibold hover:underline">
            Lihat Semua Pesanan
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Produk</th>
                <th className="px-5 py-3">Pembeli</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0, 3).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {order.invoiceNumber.split("/")[3]}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.items[0].productImage}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200"
                      />
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1 max-w-[200px]">
                          {order.items[0].productName}
                        </p>
                        {order.items.length > 1 && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            + {order.items.length - 1} produk lainnya
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{order.buyerName}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {formatRupiah(order.total)}
                  </td>
                  <td className="px-5 py-4">
                    <Badge status={order.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-200 transition-colors">
                      Proses
                    </button>
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
