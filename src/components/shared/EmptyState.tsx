import { PackageX, ShoppingBag, Search, Star } from "lucide-react";

type EmptyType = "cart" | "orders" | "search" | "products" | "wishlist" | "general";

interface EmptyStateProps {
  type?: EmptyType;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const emptyConfigs: Record<EmptyType, { icon: React.ComponentType<{ size?: number; className?: string }>, title: string; description: string }> = {
  cart: {
    icon: ShoppingBag,
    title: "Keranjang Kosong",
    description: "Yuk, mulai belanja dan temukan produk favoritmu!",
  },
  orders: {
    icon: PackageX,
    title: "Belum Ada Pesanan",
    description: "Kamu belum memiliki pesanan. Mulai belanja sekarang!",
  },
  search: {
    icon: Search,
    title: "Produk Tidak Ditemukan",
    description: "Coba kata kunci lain atau periksa ejaan kata kuncimu.",
  },
  products: {
    icon: PackageX,
    title: "Belum Ada Produk",
    description: "Tambahkan produk pertamamu untuk mulai berjualan.",
  },
  wishlist: {
    icon: Star,
    title: "Wishlist Kosong",
    description: "Simpan produk favoritmu di sini agar mudah ditemukan.",
  },
  general: {
    icon: PackageX,
    title: "Data Tidak Ditemukan",
    description: "Tidak ada data yang tersedia saat ini.",
  },
};

export default function EmptyState({
  type = "general",
  title,
  description,
  action,
}: EmptyStateProps) {
  const config = emptyConfigs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title || config.title}</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6">{description || config.description}</p>
      {action}
    </div>
  );
}
