"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ProductCard from "@/components/shared/ProductCard";
import { getProductById, getRelatedProducts } from "@/data/products";
import { formatRupiah, formatCompact, formatDate } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import {
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  Shield,
  Truck,
  RefreshCcw,
  Store,
  ChevronRight,
  Minus,
  Plus,
  Check,
  MessageCircle,
  Package,
  Clock,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const relatedProducts = getRelatedProducts(product);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hasDiscount = product.discount && product.discount > 0;
  const displayPrice = hasDiscount
    ? Math.round(product.originalPrice! * (1 - product.discount! / 100))
    : product.price;

  const handleAddToCart = (buyNow = false) => {
    addItem({
      id: `${product.id}-${JSON.stringify(selectedVariants)}`,
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      price: displayPrice,
      quantity,
      selectedVariants: Object.entries(selectedVariants).map(([groupName, variantName]) => ({
        groupName,
        variantName,
      })),
      sellerId: product.sellerId,
      sellerName: product.sellerName,
      weight: product.weight,
      maxStock: product.stock,
    });

    if (buyNow) {
      window.location.href = "/cart";
    } else {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Beranda</Link>
          <ChevronRight size={12} />
          <Link href={`/kategori/${product.categoryId}`} className="hover:text-emerald-600">
            {product.categoryName}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-700 line-clamp-1 max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-8">
          {/* ─── Left: Images ───────────────────────────── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isFlashSale && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Zap size={11} fill="white" /> Flash Sale
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-black px-2.5 py-1 rounded-lg">
                  -{product.discount}%
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-colors ${
                    selectedImage === i ? "border-emerald-500" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ─── Right: Info ─────────────────────────────── */}
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-md">
                {product.categoryName}
              </span>
              {product.stock < 20 && (
                <span className="text-xs bg-red-50 text-red-600 font-semibold px-2.5 py-1 rounded-md">
                  Stok terbatas!
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                  />
                ))}
                <span className="ml-1 text-sm font-bold text-gray-800">{product.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">{formatCompact(product.reviewCount)}</span> ulasan
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                Terjual <span className="font-medium text-gray-700">{formatCompact(product.soldCount)}</span>
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-emerald-600">
                  {formatRupiah(displayPrice)}
                </span>
                {hasDiscount && (
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-base text-gray-400 line-through">
                      {formatRupiah(product.originalPrice!)}
                    </span>
                    <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      -{product.discount}%
                    </span>
                  </div>
                )}
              </div>
              {hasDiscount && (
                <p className="text-xs text-green-600 mt-1 font-medium">
                  Hemat {formatRupiah(product.originalPrice! - displayPrice)}
                </p>
              )}
            </div>

            {/* Variants */}
            {product.variantGroups?.map((group) => (
              <div key={group.id}>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {group.name}
                  {selectedVariants[group.name] && (
                    <span className="ml-2 text-emerald-600 font-bold">{selectedVariants[group.name]}</span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, [group.name]: variant.value }))}
                      disabled={variant.stock === 0}
                      className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedVariants[group.name] === variant.value
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : variant.stock === 0
                          ? "border-gray-100 text-gray-300 cursor-not-allowed"
                          : "border-gray-200 text-gray-700 hover:border-emerald-300"
                      }`}
                    >
                      {variant.value}
                      {variant.stock === 0 && <span className="ml-1 text-xs">(Habis)</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Jumlah
                <span className="ml-2 text-xs text-gray-400 font-normal">
                  Stok: {formatCompact(product.stock)}
                </span>
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Subtotal:{" "}
                  <span className="font-bold text-gray-900">{formatRupiah(displayPrice * quantity)}</span>
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleAddToCart()}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${
                  addedToCart
                    ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                    : "bg-white border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                }`}
                id="add-to-cart-btn"
              >
                {addedToCart ? (
                  <>
                    <Check size={16} /> Ditambahkan!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} /> Tambah Keranjang
                  </>
                )}
              </button>
              <button
                onClick={() => handleAddToCart(true)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                id="buy-now-btn"
              >
                <Zap size={16} /> Beli Sekarang
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors ${
                  isWishlisted ? "bg-red-50 border-red-300 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
                }`}
                id="wishlist-btn"
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { icon: Shield, label: "Produk Original", sub: "Bergaransi resmi" },
                { icon: Truck, label: "Gratis Ongkir", sub: "Min. Rp 50.000" },
                { icon: RefreshCcw, label: "Bisa Retur", sub: "Dalam 7 hari" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                  <Icon size={18} className="text-emerald-500 mb-1" />
                  <p className="text-xs font-semibold text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Seller Info ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <img
                src={product.sellerAvatar}
                alt={product.sellerName}
                className="w-14 h-14 rounded-2xl border border-gray-100"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{product.sellerName}</h3>
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-semibold">
                    ✓ Terverifikasi
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">📍 {product.sellerCity}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500">
                    ⭐ <span className="font-medium text-gray-700">4.8</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    💬 Respon <span className="font-medium text-gray-700">&lt;1 jam</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-emerald-500 text-emerald-600 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-colors">
                <MessageCircle size={14} /> Chat Penjual
              </button>
              <Link
                href={`/seller/${product.sellerId}`}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                <Store size={14} /> Kunjungi Toko
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Product Description ─────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package size={16} className="text-emerald-500" /> Deskripsi Produk
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Berat", value: `${product.weight}g` },
              { label: "Stok", value: formatCompact(product.stock) },
              { label: "Terjual", value: formatCompact(product.soldCount) },
              { label: "Dikirim dari", value: product.sellerCity },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Reviews (dummy) ──────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900">Ulasan Pembeli</h2>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span className="font-bold text-gray-900">{product.rating}</span>
              <span className="text-sm text-gray-500">({formatCompact(product.reviewCount)} ulasan)</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: "Budi S.", rating: 5, comment: "Produk sangat bagus! Sesuai deskripsi, packaging aman, pengiriman cepat. Sangat puas belanja di sini.", date: "2026-05-20", variant: "Hitam" },
              { name: "Siti R.", rating: 5, comment: "Kualitas premium, harga terjangkau. Sudah order ke-3x dan selalu memuaskan. Recommended!", date: "2026-05-18", variant: "Putih" },
              { name: "Andi W.", rating: 4, comment: "Produk oke, tapi pengiriman agak lama 4 hari. Overall masih happy dengan kualitasnya.", date: "2026-05-15", variant: "Biru Navy" },
            ].map((review, i) => (
              <div key={i} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{review.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                    <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                    ))}
                    {review.variant && (
                      <span className="ml-2 text-xs text-gray-400">Variasi: {review.variant}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Related Products ─────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Produk Serupa</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
