"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function CartItem({ item, checked, onCheckedChange }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-100 transition-colors">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="mt-1 w-4 h-4 accent-emerald-500 flex-shrink-0 cursor-pointer"
      />

      {/* Image */}
      <Link href={`/products/${item.productId}`} className="flex-shrink-0">
        <img
          src={item.productImage}
          alt={item.productName}
          className="w-20 h-20 rounded-xl object-cover border border-gray-100"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/products/${item.productId}`}>
              <p className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors">
                {item.productName}
              </p>
            </Link>
            {item.selectedVariants && item.selectedVariants.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {item.selectedVariants.map((v) => (
                  <span
                    key={v.groupName}
                    className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md"
                  >
                    {v.groupName}: {v.variantName}
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Toko: {item.sellerName}
            </p>
          </div>

          {/* Delete button */}
          <button
            onClick={() => removeItem(item.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
            aria-label="Hapus item"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-bold text-gray-900">
            {formatRupiah(item.price)}
          </span>

          {/* Quantity counter */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-lg border border-gray-200 hover:border-emerald-400 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
              aria-label="Kurangi"
            >
              <Minus size={13} />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-800">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.maxStock}
              className="w-7 h-7 rounded-lg border border-gray-200 hover:border-emerald-400 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Tambah"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <p className="text-xs text-gray-400 mt-1">
          Subtotal: <span className="text-emerald-600 font-semibold">{formatRupiah(item.price * item.quantity)}</span>
        </p>
      </div>
    </div>
  );
}
