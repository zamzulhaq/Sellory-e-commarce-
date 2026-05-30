import { formatRupiah } from "@/lib/utils";
import { Tag, Truck, ShoppingBag } from "lucide-react";

interface CheckoutSummaryProps {
  subtotal: number;
  shippingCost: number;
  discount: number;
  voucherDiscount?: number;
  onCheckout?: () => void;
  checkoutLabel?: string;
  isLoading?: boolean;
}

export default function CheckoutSummary({
  subtotal,
  shippingCost,
  discount,
  voucherDiscount = 0,
  onCheckout,
  checkoutLabel = "Buat Pesanan",
  isLoading = false,
}: CheckoutSummaryProps) {
  const total = subtotal + shippingCost - discount - voucherDiscount;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
      <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
        <ShoppingBag size={16} className="text-emerald-500" />
        Ringkasan Belanja
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Total Harga</span>
          <span className="font-medium text-gray-900">{formatRupiah(subtotal)}</span>
        </div>

        {shippingCost > 0 && (
          <div className="flex justify-between text-gray-600">
            <span className="flex items-center gap-1">
              <Truck size={13} className="text-gray-400" />
              Ongkos Kirim
            </span>
            <span className="font-medium text-gray-900">{formatRupiah(shippingCost)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Diskon Produk</span>
            <span className="font-medium">- {formatRupiah(discount)}</span>
          </div>
        )}

        {voucherDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <Tag size={13} />
              Voucher
            </span>
            <span className="font-medium">- {formatRupiah(voucherDiscount)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-dashed border-gray-200 mt-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Total Tagihan</span>
          <span className="text-xl font-black text-emerald-600">{formatRupiah(Math.max(total, 0))}</span>
        </div>
      </div>

      {onCheckout && (
        <button
          onClick={onCheckout}
          disabled={isLoading || total <= 0}
          className="mt-5 w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          id="checkout-btn"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            checkoutLabel
          )}
        </button>
      )}

      <p className="text-xs text-gray-400 text-center mt-3">
        Transaksi dijamin aman & terpercaya 🔒
      </p>
    </div>
  );
}
