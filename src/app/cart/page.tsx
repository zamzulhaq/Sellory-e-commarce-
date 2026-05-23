"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CartItemComponent from "@/components/shared/CartItem";
import CheckoutSummary from "@/components/shared/CheckoutSummary";
import EmptyState from "@/components/shared/EmptyState";
import { useCart } from "@/contexts/CartContext";
import { formatRupiah } from "@/lib/utils";
import { Trash2, ChevronRight, Tag, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, itemCount, totalPrice, removeItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(
    new Set(items.map((i) => i.id))
  );

  const allChecked = items.length > 0 && checkedItems.size === items.length;

  const toggleAll = () => {
    if (allChecked) setCheckedItems(new Set());
    else setCheckedItems(new Set(items.map((i) => i.id)));
  };

  const toggleItem = (id: string, checked: boolean) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const checkedItemsList = items.filter((i) => checkedItems.has(i.id));
  const checkedSubtotal = checkedItemsList.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const deleteChecked = () => {
    checkedItems.forEach((id) => removeItem(id));
    setCheckedItems(new Set());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-xl font-black text-gray-900">Keranjang Belanja</h1>
          {itemCount > 0 && (
            <span className="text-sm bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full">
              {itemCount} item
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-8">
            <EmptyState
              type="cart"
              action={
                <Link
                  href="/"
                  className="bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Mulai Belanja
                </Link>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {/* Select All Bar */}
              <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    id="select-all-checkbox"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Pilih Semua ({items.length} produk)
                  </span>
                </label>
                {checkedItems.size > 0 && (
                  <button
                    onClick={deleteChecked}
                    className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    <Trash2 size={14} />
                    Hapus ({checkedItems.size})
                  </button>
                )}
              </div>

              {/* Cart Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    item={item}
                    checked={checkedItems.has(item.id)}
                    onCheckedChange={(checked) => toggleItem(item.id, checked)}
                  />
                ))}
              </div>

              {/* Voucher */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Tag size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Gunakan Voucher</p>
                    <p className="text-xs text-gray-400">Hemat lebih banyak dengan voucher</p>
                  </div>
                  <button className="text-sm text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    Pilih <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Trust */}
              <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
                <ShieldCheck size={13} className="text-emerald-500" />
                Transaksi aman & terlindungi oleh Sellory
              </div>
            </div>

            {/* Right: Summary */}
            <div>
              <CheckoutSummary
                subtotal={checkedSubtotal}
                shippingCost={0}
                discount={0}
                onCheckout={() => {
                  if (checkedItemsList.length === 0) {
                    alert("Pilih produk yang ingin di-checkout terlebih dahulu.");
                    return;
                  }
                  window.location.href = "/checkout";
                }}
                checkoutLabel={`Checkout (${checkedItems.size} produk)`}
              />

              {/* Info */}
              <div className="mt-3 bg-emerald-50 rounded-2xl p-4 text-sm text-emerald-700">
                <p className="font-semibold mb-1">🎉 Hampir Gratis Ongkir!</p>
                <p className="text-xs text-emerald-600">
                  Tambah belanja {formatRupiah(Math.max(0, 50000 - checkedSubtotal))} lagi untuk dapat gratis ongkir.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
