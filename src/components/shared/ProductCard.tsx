"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Store, Zap } from "lucide-react";
import type { Product } from "@/types";
import { formatRupiah, formatCompact } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const hasDiscount = product.discount && product.discount > 0;
  const displayPrice = hasDiscount
    ? Math.round(product.originalPrice! * (1 - product.discount! / 100))
    : product.price;

  return (
    <Link href={`/products/${product.id}`} className={`block group ${className}`}>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-emerald-100 transition-all duration-300 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Flash Sale Badge */}
          {product.isFlashSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <Zap size={10} fill="white" />
              Flash Sale
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
              -{product.discount}%
            </div>
          )}

          {/* Quick add button (hover) */}
          <div className="absolute bottom-0 inset-x-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Quick add to cart handled in product detail
              }}
            >
              <ShoppingCart size={13} />
              Tambah ke Keranjang
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Name */}
          <h3 className="text-sm text-gray-800 font-medium line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-1.5">
            <span className="text-base font-bold text-gray-900">
              {formatRupiah(displayPrice)}
            </span>
            {hasDiscount && (
              <span className="ml-1.5 text-xs text-gray-400 line-through">
                {formatRupiah(product.originalPrice!)}
              </span>
            )}
          </div>

          {/* Rating & Sold */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-400">
              Terjual {formatCompact(product.soldCount)}
            </span>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-1.5">
            <Store size={11} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-400 truncate">{product.sellerCity}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
