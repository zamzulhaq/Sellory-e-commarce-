"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CheckoutSummary from "@/components/shared/CheckoutSummary";
import { useCart } from "@/contexts/CartContext";
import { addresses, couriers, paymentMethods, vouchers } from "@/data/orders";
import { formatRupiah } from "@/lib/utils";
import {
  MapPin,
  ChevronRight,
  Truck,
  Tag,
  CreditCard,
  Check,
  Plus,
  ChevronDown,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedCourier, setSelectedCourier] = useState(couriers[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<(typeof vouchers)[0] | null>(null);
  const [voucherError, setVoucherError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [showCourierList, setShowCourierList] = useState(false);
  const [showPaymentList, setShowPaymentList] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = selectedCourier?.price ?? 0;
  const voucherDiscount = appliedVoucher
    ? appliedVoucher.discountType === "percentage"
      ? Math.min(
          (subtotal * appliedVoucher.discountValue) / 100,
          appliedVoucher.maxDiscount ?? Infinity
        )
      : appliedVoucher.discountValue
    : 0;

  const applyVoucher = () => {
    setVoucherError("");
    const found = vouchers.find((v) => v.code === voucherCode.toUpperCase().trim());
    if (!found) {
      setVoucherError("Kode voucher tidak ditemukan.");
      return;
    }
    if (subtotal < found.minPurchase) {
      setVoucherError(`Min. belanja ${formatRupiah(found.minPurchase)} untuk voucher ini.`);
      return;
    }
    setAppliedVoucher(found);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">Keranjang kamu kosong.</p>
          <a href="/" className="text-emerald-600 font-semibold hover:underline">
            Kembali Belanja
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-black text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">

            {/* ─── Alamat Pengiriman ─── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-500" />
                  Alamat Pengiriman
                </h2>
                <button className="text-xs text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
                  <Plus size={12} /> Tambah Alamat
                </button>
              </div>

              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      selectedAddress.id === addr.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress.id === addr.id}
                      onChange={() => setSelectedAddress(addr)}
                      className="mt-0.5 accent-emerald-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900">{addr.recipientName}</span>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md font-semibold">Utama</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{addr.phone}</p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {addr.detail}, {addr.district}, {addr.city}, {addr.province} {addr.postalCode}
                      </p>
                    </div>
                    {selectedAddress.id === addr.id && (
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* ─── Produk Dipesan ─── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Produk yang Dipesan</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.productName}</p>
                      {item.selectedVariants && item.selectedVariants.length > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.selectedVariants.map((v) => `${v.groupName}: ${v.variantName}`).join(", ")}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.quantity}x {formatRupiah(item.price)}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="mt-4">
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                  Catatan untuk Penjual (opsional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Warna preferensi, instruksi khusus..."
                  rows={2}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-400 resize-none placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* ─── Pilih Kurir ─── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck size={16} className="text-emerald-500" />
                Pilih Kurir
              </h2>

              <button
                onClick={() => setShowCourierList(!showCourierList)}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-100 hover:border-emerald-200 rounded-xl transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">
                    {selectedCourier.name} – {selectedCourier.service}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Estimasi {selectedCourier.estimatedDays} · {formatRupiah(selectedCourier.price)}
                  </p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${showCourierList ? "rotate-180" : ""}`} />
              </button>

              {showCourierList && (
                <div className="mt-2 space-y-2">
                  {couriers.map((courier) => (
                    <label
                      key={courier.id}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedCourier.id === courier.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="courier"
                        checked={selectedCourier.id === courier.id}
                        onChange={() => { setSelectedCourier(courier); setShowCourierList(false); }}
                        className="accent-emerald-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {courier.name} <span className="text-gray-400 font-normal">– {courier.service}</span>
                        </p>
                        <p className="text-xs text-gray-400">Estimasi {courier.estimatedDays}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{formatRupiah(courier.price)}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* ─── Voucher ─── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag size={16} className="text-orange-500" />
                Voucher & Promo
              </h2>

              {appliedVoucher ? (
                <div className="flex items-center justify-between p-3.5 bg-green-50 border border-green-200 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-green-700">{appliedVoucher.code}</p>
                    <p className="text-xs text-green-600 mt-0.5">{appliedVoucher.description}</p>
                    <p className="text-xs font-bold text-green-700 mt-1">- {formatRupiah(voucherDiscount)}</p>
                  </div>
                  <button
                    onClick={() => { setAppliedVoucher(null); setVoucherCode(""); }}
                    className="text-xs text-red-500 hover:text-red-600 font-semibold"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && applyVoucher()}
                      placeholder="Masukkan kode voucher..."
                      className="flex-1 text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-emerald-400 uppercase placeholder:uppercase placeholder:text-gray-300"
                    />
                    <button
                      onClick={applyVoucher}
                      className="px-4 bg-emerald-500 text-white font-bold text-sm rounded-xl hover:bg-emerald-600 transition-colors"
                    >
                      Pakai
                    </button>
                  </div>
                  {voucherError && <p className="text-xs text-red-500 mt-2">{voucherError}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["SELLORY50", "GRATIS10K", "NEWUSER"].map((code) => (
                      <button
                        key={code}
                        onClick={() => setVoucherCode(code)}
                        className="text-xs bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-orange-100 transition-colors"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ─── Metode Pembayaran ─── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-blue-500" />
                Metode Pembayaran
              </h2>

              <button
                onClick={() => setShowPaymentList(!showPaymentList)}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-100 hover:border-blue-200 rounded-xl transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">{selectedPayment.name}</p>
                  {selectedPayment.description && (
                    <p className="text-xs text-gray-400 mt-0.5">{selectedPayment.description}</p>
                  )}
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${showPaymentList ? "rotate-180" : ""}`} />
              </button>

              {showPaymentList && (
                <div className="mt-2 space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedPayment.id === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment.id === method.id}
                        onChange={() => { setSelectedPayment(method); setShowPaymentList(false); }}
                        className="accent-blue-500"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{method.name}</p>
                        {method.description && <p className="text-xs text-gray-400">{method.description}</p>}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <CheckoutSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              discount={0}
              voucherDiscount={voucherDiscount}
              onCheckout={handleCheckout}
              checkoutLabel="Bayar Sekarang"
              isLoading={isLoading}
            />
            <div className="mt-3 text-xs text-center text-gray-400">
              Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat & Ketentuan Sellory.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
