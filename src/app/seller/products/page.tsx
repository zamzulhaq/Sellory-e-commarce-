"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import { formatRupiah, formatCompact } from "@/lib/utils";

export default function ProductManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.sellerId === "seller-1" && // Filter for dummy seller-1
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Produk Saya</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola semua produk yang Anda jual di Sellory.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm">
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
              placeholder="Cari nama produk..."
              className="flex-1 px-3 py-2 text-sm outline-none text-gray-700"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filter Kategori
            </button>
            <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 outline-none focus:border-emerald-500 cursor-pointer">
              <option>Terbaru</option>
              <option>Stok Sedikit</option>
              <option>Terlaris</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-5 py-3">Info Produk</th>
                <th className="px-5 py-3">Harga</th>
                <th className="px-5 py-3">Stok</th>
                <th className="px-5 py-3">Statistik</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-gray-100 border border-gray-200"
                      />
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-2 max-w-[250px] leading-snug">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{product.categoryName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">{formatRupiah(product.price)}</p>
                    {product.discount ? (
                      <p className="text-xs text-emerald-600 mt-0.5">Diskon {product.discount}%</p>
                    ) : null}
                  </td>
                  <td className="px-5 py-4">
                    <p className={`font-semibold ${product.stock < 20 ? "text-red-600" : "text-gray-900"}`}>
                      {product.stock}
                    </p>
                    {product.stock < 20 && <p className="text-xs text-red-500 mt-0.5">Segera isi!</p>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>Terjual: <span className="font-semibold">{formatCompact(product.soldCount)}</span></p>
                      <p>Dilihat: <span className="font-semibold">{formatCompact(product.soldCount * 3)}</span></p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-sm">
              Tidak ada produk yang cocok dengan pencarian Anda.
            </div>
          )}
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <p>Menampilkan {filteredProducts.length} produk</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50" disabled>Sebelumnnya</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md bg-emerald-50 text-emerald-600 font-semibold border-emerald-200">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}
