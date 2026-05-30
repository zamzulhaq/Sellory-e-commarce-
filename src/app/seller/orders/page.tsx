"use client";

import { useState } from "react";
import { Search, Filter, Check, Truck, Clock, X, Package } from "lucide-react";
import { orders } from "@/data/orders";
import { formatRupiah, formatDate } from "@/lib/utils";
import Badge from "@/components/shared/Badge";

export default function OrderManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");

  const tabs = ["Semua", "Perlu Diproses", "Dikirim", "Selesai", "Dibatalkan"];

  const filteredOrders = orders.filter((o) => {
    if (o.sellerId !== "seller-1") return false; // dummy logic
    
    const matchesSearch = o.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.buyerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "Semua") return matchesSearch;
    if (activeTab === "Perlu Diproses") return matchesSearch && ["pending", "paid", "processing"].includes(o.status);
    if (activeTab === "Dikirim") return matchesSearch && o.status === "shipped";
    if (activeTab === "Selesai") return matchesSearch && ["delivered", "completed"].includes(o.status);
    if (activeTab === "Dibatalkan") return matchesSearch && ["cancelled", "refunded"].includes(o.status);
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Pesanan Masuk</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola pesanan dari pembeli dengan cepat dan mudah.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-4 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-1 max-w-sm rounded-xl border border-gray-200 overflow-hidden focus-within:border-emerald-500 transition-colors">
            <div className="pl-3 py-2 flex items-center justify-center bg-white text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor invoice atau pembeli..."
              className="flex-1 px-3 py-2 text-sm outline-none text-gray-700"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={16} /> Filter Lanjutan
          </button>
        </div>

        {/* Order List */}
        <div className="divide-y divide-gray-100">
          {filteredOrders.length === 0 ? (
            <div className="py-16 text-center">
              <Package size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Tidak ada pesanan yang sesuai.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">{order.buyerName}</span>
                    <span className="text-xs text-gray-400 font-medium">{formatDate(order.createdAt)}</span>
                    <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded-md">
                      {order.invoiceNumber}
                    </span>
                  </div>
                  <Badge status={order.status} />
                </div>

                {/* Items */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <img
                          src={item.productImage}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-gray-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 leading-snug">{item.productName}</p>
                          {item.selectedVariants && item.selectedVariants.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {item.selectedVariants.map((v) => `${v.groupName}: ${v.variantName}`).join(", ")}
                            </p>
                          )}
                          <p className="text-sm font-semibold text-gray-700 mt-1">
                            {item.quantity} x {formatRupiah(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Actions */}
                  <div className="md:w-64 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Belanja</p>
                      <p className="text-lg font-black text-emerald-600 mb-4">{formatRupiah(order.total)}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
                        <Truck size={14} className="text-gray-400" /> {order.courier}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      {["pending", "paid"].includes(order.status) && (
                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                          <Check size={16} /> Terima Pesanan
                        </button>
                      )}
                      {["processing"].includes(order.status) && (
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                          <Truck size={16} /> Input Resi
                        </button>
                      )}
                      {["shipped"].includes(order.status) && (
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                          <Clock size={16} /> Lacak Resi
                        </button>
                      )}
                      {["pending"].includes(order.status) && (
                        <button className="w-full bg-white border border-gray-200 hover:border-red-500 text-gray-600 hover:text-red-600 font-semibold py-2 rounded-xl text-sm transition-colors">
                          Tolak Pesanan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination Dummy */}
        {filteredOrders.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
            <p>Menampilkan {filteredOrders.length} pesanan</p>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-white" disabled>Sebelumnnya</button>
              <button className="px-3 py-1 border border-gray-200 rounded-md bg-emerald-50 text-emerald-600 font-semibold border-emerald-200">1</button>
              <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-white">Selanjutnya</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
