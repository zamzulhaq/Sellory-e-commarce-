import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import BannerCarousel from "@/components/shared/BannerCarousel";
import CategoryCard from "@/components/shared/CategoryCard";
import ProductCard from "@/components/shared/ProductCard";
import { banners } from "@/data/banners";
import { categories } from "@/data/categories";
import { flashSaleProducts, featuredProducts, latestProducts } from "@/data/products";
import { formatRupiah, formatCompact } from "@/lib/utils";
import { Zap, TrendingUp, Clock, ChevronRight, ShieldCheck, Truck, RefreshCcw, Headphones } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sellory - Marketplace Modern untuk UMKM Indonesia",
  description: "Belanja produk UMKM Indonesia terbaik dengan harga terjangkau. Flash sale, gratis ongkir, bayar aman.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* ─── Hero Section ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 pt-6 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main banner */}
            <div className="lg:col-span-3">
              <BannerCarousel banners={banners} />
            </div>
            {/* Side banners */}
            <div className="hidden lg:flex flex-col gap-3">
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-4 flex flex-col justify-end min-h-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,white,transparent)]" />
                <p className="text-white font-bold text-sm mb-1">Flash Sale</p>
                <p className="text-white/80 text-xs">Setiap hari 12.00–14.00</p>
                <Link href="#flash-sale" className="mt-2 text-xs bg-white/20 text-white px-3 py-1.5 rounded-lg w-fit font-medium hover:bg-white/30 transition-colors">
                  Lihat →
                </Link>
              </div>
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 flex flex-col justify-end relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_70%,white,transparent)]" />
                <p className="text-white font-bold text-sm mb-1">Voucher Gratis</p>
                <p className="text-white/80 text-xs">Diskon s/d 90% hari ini</p>
                <Link href="#" className="mt-2 text-xs bg-white/20 text-white px-3 py-1.5 rounded-lg w-fit font-medium hover:bg-white/30 transition-colors">
                  Klaim →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trust Badges ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Truck, title: "Gratis Ongkir", desc: "Min. belanja Rp 50.000" },
              { icon: ShieldCheck, title: "Transaksi Aman", desc: "Uang kembali 100%" },
              { icon: RefreshCcw, title: "Mudah Retur", desc: "Dalam 7 hari" },
              { icon: Headphones, title: "CS 24/7", desc: "Siap membantu Anda" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Categories ───────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Kategori Produk</h2>
              <Link
                href="/kategori"
                className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Flash Sale ───────────────────────────────────── */}
        <section id="flash-sale" className="max-w-7xl mx-auto px-4 py-2">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-white/20 text-white px-3 py-1.5 rounded-xl">
                  <Zap size={16} fill="white" />
                  <span className="font-black text-sm">Flash Sale</span>
                </div>
                {/* Countdown */}
                <div className="flex items-center gap-1.5">
                  {["02", "34", "18"].map((val, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="bg-gray-900 text-white text-sm font-black px-2.5 py-1.5 rounded-lg min-w-[2.2rem] text-center countdown-pulse">
                        {val}
                      </div>
                      {i < 2 && <span className="text-white font-black">:</span>}
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/flash-sale"
                className="text-sm text-white/90 font-medium hover:text-white flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {flashSaleProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Featured Products ────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <TrendingUp size={16} className="text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Produk Populer</h2>
              </div>
              <Link
                href="/produk"
                className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Promo Banner ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Dukung UMKM Lokal", desc: "Ribuan produk dari pengrajin Indonesia", color: "from-emerald-500 to-teal-600", emoji: "🇮🇩" },
              { title: "Gratis Ongkir Seharian", desc: "Min. belanja Rp 50.000 ke semua kota", color: "from-blue-500 to-indigo-600", emoji: "🚚" },
              { title: "Bayar Nanti, Pakai Paylater", desc: "Cicilan 0% untuk semua produk pilihan", color: "from-purple-500 to-pink-600", emoji: "💳" },
            ].map(({ title, desc, color, emoji }) => (
              <div
                key={title}
                className={`bg-gradient-to-r ${color} rounded-2xl p-5 flex items-center gap-4`}
              >
                <span className="text-4xl">{emoji}</span>
                <div>
                  <p className="text-white font-bold text-sm">{title}</p>
                  <p className="text-white/80 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Latest Products ──────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Produk Terbaru</h2>
              </div>
              <Link
                href="/produk?sort=terbaru"
                className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Seller CTA ───────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 pb-10">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,white,transparent)]" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-4">
                🛒 Bergabung dengan 50.000+ Penjual
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                Mulai Berjualan di Sellory
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-6">
                Daftarkan tokomu gratis dan jangkau jutaan pembeli di seluruh Indonesia. Komisi rendah, fitur lengkap.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/seller/dashboard"
                  className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm"
                >
                  Mulai Berjualan Gratis
                </Link>
                <Link
                  href="#"
                  className="bg-white/20 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors text-sm"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
