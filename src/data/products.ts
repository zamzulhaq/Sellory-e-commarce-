import type { Product } from "@/types";

export const products: Product[] = [
  // ─── ELEKTRONIK ───────────────────────────────────────
  {
    id: "prod-1",
    name: "Earbuds Wireless TWS Pro X1 - True Wireless Stereo",
    slug: "earbuds-wireless-tws-pro-x1",
    description:
      "Nikmati kualitas audio premium dengan Earbuds Wireless TWS Pro X1. Dilengkapi dengan teknologi Active Noise Cancellation (ANC), baterai tahan 8 jam penggunaan + 24 jam dengan case charging, serta konektivitas Bluetooth 5.3 yang stabil. Cocok untuk aktivitas sehari-hari, olahraga, dan kerja.",
    price: 349000,
    originalPrice: 699000,
    discount: 50,
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-1",
    categoryName: "Elektronik",
    sellerId: "seller-1",
    sellerName: "Toko Elektronik Jaya",
    sellerCity: "Jakarta Barat",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TEJ&backgroundColor=10b981",
    rating: 4.8,
    reviewCount: 1240,
    soldCount: 8920,
    stock: 245,
    weight: 150,
    variantGroups: [
      {
        id: "vg-1",
        name: "Warna",
        variants: [
          { id: "v-1", name: "Warna", value: "Hitam", stock: 120 },
          { id: "v-2", name: "Warna", value: "Putih", stock: 80 },
          { id: "v-3", name: "Warna", value: "Biru Navy", stock: 45 },
        ],
      },
    ],
    tags: ["earbuds", "tws", "bluetooth", "anc", "wireless"],
    isFlashSale: true,
    flashSaleEndTime: "2026-05-23T14:00:00+07:00",
    isFeatured: true,
    createdAt: "2026-01-15T08:00:00Z",
  },
  {
    id: "prod-2",
    name: "Smartwatch Garmin Venu 3 - GPS Fitness Tracker Premium",
    slug: "smartwatch-garmin-venu-3",
    description:
      "Smartwatch premium dengan layar AMOLED 1.4 inci, GPS built-in, pemantauan detak jantung 24/7, tracking tidur, dan lebih dari 30 mode olahraga. Tahan air hingga 5 ATM. Baterai tahan hingga 14 hari.",
    price: 5299000,
    originalPrice: 6500000,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-1",
    categoryName: "Elektronik",
    sellerId: "seller-1",
    sellerName: "Toko Elektronik Jaya",
    sellerCity: "Jakarta Barat",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TEJ&backgroundColor=10b981",
    rating: 4.9,
    reviewCount: 432,
    soldCount: 1240,
    stock: 50,
    weight: 200,
    variantGroups: [
      {
        id: "vg-2",
        name: "Warna",
        variants: [
          { id: "v-4", name: "Warna", value: "Slate Black", stock: 20 },
          { id: "v-5", name: "Warna", value: "Ivory Gold", stock: 15 },
          { id: "v-6", name: "Warna", value: "French Gray", stock: 15 },
        ],
      },
    ],
    tags: ["smartwatch", "garmin", "gps", "fitness", "premium"],
    isFeatured: true,
    createdAt: "2026-02-10T08:00:00Z",
  },
  {
    id: "prod-3",
    name: "Laptop Gaming ASUS ROG Zephyrus G14 - AMD Ryzen 9",
    slug: "laptop-gaming-asus-rog-zephyrus-g14",
    description:
      "Laptop gaming tipis dan ringan bertenaga AMD Ryzen 9 8945HS, GPU NVIDIA RTX 4070, RAM 32GB DDR5, SSD NVMe 1TB. Layar QHD+ 165Hz dengan respons 3ms. Desain premium dengan bobot hanya 1.6kg.",
    price: 24999000,
    originalPrice: 28000000,
    discount: 11,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-1",
    categoryName: "Elektronik",
    sellerId: "seller-1",
    sellerName: "Toko Elektronik Jaya",
    sellerCity: "Jakarta Barat",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TEJ&backgroundColor=10b981",
    rating: 4.9,
    reviewCount: 218,
    soldCount: 430,
    stock: 15,
    weight: 1600,
    tags: ["laptop", "gaming", "asus", "rog", "ryzen"],
    isFeatured: true,
    createdAt: "2026-03-01T08:00:00Z",
  },

  // ─── FASHION ──────────────────────────────────────────
  {
    id: "prod-4",
    name: "Batik Tulis Motif Parang Premium - Kemeja Lengan Panjang",
    slug: "batik-tulis-motif-parang-premium",
    description:
      "Kemeja batik tulis premium dengan motif parang klasik. Dibuat dari kain katun prima 100% yang nyaman dan adem. Cocok untuk acara formal maupun kasual. Tersedia dalam berbagai ukuran.",
    price: 425000,
    originalPrice: 580000,
    discount: 27,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4dbe?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-2",
    categoryName: "Fashion Pria",
    sellerId: "seller-2",
    sellerName: "Batik Nusantara",
    sellerCity: "Yogyakarta",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=BN&backgroundColor=6366f1",
    rating: 4.9,
    reviewCount: 1890,
    soldCount: 12400,
    stock: 340,
    weight: 300,
    variantGroups: [
      {
        id: "vg-3",
        name: "Ukuran",
        variants: [
          { id: "v-7", name: "Ukuran", value: "S", stock: 60 },
          { id: "v-8", name: "Ukuran", value: "M", stock: 80 },
          { id: "v-9", name: "Ukuran", value: "L", stock: 100 },
          { id: "v-10", name: "Ukuran", value: "XL", stock: 70 },
          { id: "v-11", name: "Ukuran", value: "XXL", stock: 30 },
        ],
      },
    ],
    tags: ["batik", "kemeja", "formal", "parang", "premium"],
    isFlashSale: true,
    flashSaleEndTime: "2026-05-23T14:00:00+07:00",
    isFeatured: true,
    createdAt: "2025-11-20T08:00:00Z",
  },
  {
    id: "prod-5",
    name: "Dress Midi Floral Rayon - Fashion Wanita Casual",
    slug: "dress-midi-floral-rayon",
    description:
      "Dress midi dengan motif bunga-bunga yang cantik, terbuat dari bahan rayon premium yang lembut dan jatuh. Cocok untuk acara semi-formal, kondangan, atau hangout. Tersedia dalam berbagai warna cerah.",
    price: 185000,
    originalPrice: 260000,
    discount: 29,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-3",
    categoryName: "Fashion Wanita",
    sellerId: "seller-2",
    sellerName: "Batik Nusantara",
    sellerCity: "Yogyakarta",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=BN&backgroundColor=6366f1",
    rating: 4.7,
    reviewCount: 2340,
    soldCount: 18900,
    stock: 500,
    weight: 250,
    variantGroups: [
      {
        id: "vg-4",
        name: "Warna",
        variants: [
          { id: "v-12", name: "Warna", value: "Biru Tosca", stock: 150 },
          { id: "v-13", name: "Warna", value: "Pink Soft", stock: 120 },
          { id: "v-14", name: "Warna", value: "Hijau Mint", stock: 100 },
          { id: "v-15", name: "Warna", value: "Kuning Pastel", stock: 80 },
        ],
      },
      {
        id: "vg-5",
        name: "Ukuran",
        variants: [
          { id: "v-16", name: "Ukuran", value: "S", stock: 100 },
          { id: "v-17", name: "Ukuran", value: "M", stock: 150 },
          { id: "v-18", name: "Ukuran", value: "L", stock: 150 },
          { id: "v-19", name: "Ukuran", value: "XL", stock: 100 },
        ],
      },
    ],
    tags: ["dress", "midi", "floral", "rayon", "casual", "wanita"],
    isFeatured: true,
    createdAt: "2025-12-10T08:00:00Z",
  },

  // ─── MAKANAN & MINUMAN ────────────────────────────────
  {
    id: "prod-6",
    name: "Rendang Daging Sapi Premium - Kemasan 500gr",
    slug: "rendang-daging-sapi-premium-500gr",
    description:
      "Rendang daging sapi asli Padang, dimasak dengan rempah pilihan tanpa bahan pengawet. Tahan 3 bulan dalam suhu ruang, 6 bulan dalam kulkas. Kemasan vakum higienis. Cocok untuk oleh-oleh dan hadiah.",
    price: 95000,
    originalPrice: 120000,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-4",
    categoryName: "Makanan & Minuman",
    sellerId: "seller-3",
    sellerName: "Dapur Nusantara",
    sellerCity: "Surabaya",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DN&backgroundColor=f59e0b",
    rating: 4.8,
    reviewCount: 3210,
    soldCount: 24500,
    stock: 200,
    weight: 600,
    tags: ["rendang", "padang", "daging", "halal", "oleh-oleh"],
    isFlashSale: true,
    flashSaleEndTime: "2026-05-23T14:00:00+07:00",
    createdAt: "2025-10-05T08:00:00Z",
  },
  {
    id: "prod-7",
    name: "Kopi Arabika Gayo Aceh - Single Origin 250gr",
    slug: "kopi-arabika-gayo-aceh-250gr",
    description:
      "Kopi Arabika 100% dari pegunungan Gayo, Aceh. Profil rasa: fruity, floral, dengan keasaman sedang. Roast level medium. Bisa diseduh dengan V60, Chemex, French Press, atau espresso machine.",
    price: 78000,
    originalPrice: 95000,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-4",
    categoryName: "Makanan & Minuman",
    sellerId: "seller-3",
    sellerName: "Dapur Nusantara",
    sellerCity: "Surabaya",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DN&backgroundColor=f59e0b",
    rating: 4.9,
    reviewCount: 1870,
    soldCount: 15200,
    stock: 380,
    weight: 350,
    variantGroups: [
      {
        id: "vg-6",
        name: "Jenis Roast",
        variants: [
          { id: "v-20", name: "Jenis Roast", value: "Light Roast", stock: 120 },
          { id: "v-21", name: "Jenis Roast", value: "Medium Roast", stock: 150 },
          { id: "v-22", name: "Jenis Roast", value: "Dark Roast", stock: 110 },
        ],
      },
    ],
    tags: ["kopi", "arabika", "gayo", "aceh", "single-origin"],
    isFeatured: true,
    createdAt: "2025-09-15T08:00:00Z",
  },

  // ─── KESEHATAN & KECANTIKAN ───────────────────────────
  {
    id: "prod-8",
    name: "Serum Vitamin C 20% Brightening - Kulit Cerah Glowing",
    slug: "serum-vitamin-c-20-brightening",
    description:
      "Serum vitamin C konsentrasi tinggi 20% dengan formula stabil. Mengandung Niacinamide 5%, Hyaluronic Acid, dan Ferulic Acid. Mencerahkan, meratakan warna kulit, dan melindungi dari radikal bebas. Cocok untuk semua jenis kulit.",
    price: 125000,
    originalPrice: 200000,
    discount: 38,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-5",
    categoryName: "Kesehatan & Kecantikan",
    sellerId: "seller-5",
    sellerName: "Kecantikan Alami",
    sellerCity: "Medan",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=KA&backgroundColor=ec4899",
    rating: 4.8,
    reviewCount: 4320,
    soldCount: 32100,
    stock: 680,
    weight: 100,
    tags: ["serum", "vitamin-c", "brightening", "skincare", "glowing"],
    isFlashSale: true,
    flashSaleEndTime: "2026-05-23T14:00:00+07:00",
    isFeatured: true,
    createdAt: "2025-08-20T08:00:00Z",
  },
  {
    id: "prod-9",
    name: "Sunscreen SPF 50+ PA++++ Lightweight - Anti UV & Blue Light",
    slug: "sunscreen-spf-50-pa-plus-plus",
    description:
      "Sunscreen ringan dengan perlindungan SPF 50+ PA++++ yang melindungi dari UVA, UVB, dan Blue Light. Formula no white cast, cocok untuk kulit sensitif. Mengandung Centella Asiatica untuk menenangkan kulit.",
    price: 89000,
    originalPrice: 130000,
    discount: 32,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-5",
    categoryName: "Kesehatan & Kecantikan",
    sellerId: "seller-5",
    sellerName: "Kecantikan Alami",
    sellerCity: "Medan",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=KA&backgroundColor=ec4899",
    rating: 4.7,
    reviewCount: 2890,
    soldCount: 21000,
    stock: 420,
    weight: 120,
    tags: ["sunscreen", "spf50", "skincare", "anti-uv", "lightweight"],
    createdAt: "2025-11-01T08:00:00Z",
  },

  // ─── OLAHRAGA ─────────────────────────────────────────
  {
    id: "prod-10",
    name: "Sepatu Lari Nike Air Zoom Pegasus 41 - Running Shoes",
    slug: "sepatu-lari-nike-air-zoom-pegasus-41",
    description:
      "Sepatu lari premium dengan teknologi Air Zoom dan React foam untuk kenyamanan maksimal. Outsole dengan pola waffle khusus untuk traksi optimal di berbagai permukaan. Desain breathable mesh yang ringan.",
    price: 1399000,
    originalPrice: 1799000,
    discount: 22,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-7",
    categoryName: "Olahraga",
    sellerId: "seller-4",
    sellerName: "Sport Center ID",
    sellerCity: "Bandung",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=SC&backgroundColor=f97316",
    rating: 4.8,
    reviewCount: 890,
    soldCount: 4200,
    stock: 120,
    weight: 400,
    variantGroups: [
      {
        id: "vg-7",
        name: "Ukuran",
        variants: [
          { id: "v-23", name: "Ukuran", value: "39", stock: 15 },
          { id: "v-24", name: "Ukuran", value: "40", stock: 25 },
          { id: "v-25", name: "Ukuran", value: "41", stock: 30 },
          { id: "v-26", name: "Ukuran", value: "42", stock: 30 },
          { id: "v-27", name: "Ukuran", value: "43", stock: 15 },
          { id: "v-28", name: "Ukuran", value: "44", stock: 5 },
        ],
      },
      {
        id: "vg-8",
        name: "Warna",
        variants: [
          { id: "v-29", name: "Warna", value: "Hitam Putih", stock: 60 },
          { id: "v-30", name: "Warna", value: "Biru Navy", stock: 40 },
          { id: "v-31", name: "Warna", value: "Merah", stock: 20 },
        ],
      },
    ],
    tags: ["sepatu", "lari", "nike", "running", "olahraga"],
    isFeatured: true,
    createdAt: "2026-01-05T08:00:00Z",
  },

  // ─── RUMAH & DAPUR ────────────────────────────────────
  {
    id: "prod-11",
    name: "Kursi Kantor Ergonomis Mesh - Adjustable Lumbar Support",
    slug: "kursi-kantor-ergonomis-mesh",
    description:
      "Kursi kantor ergonomis dengan sandaran jaring mesh breathable, penyangga punggung bawah yang bisa diatur, sandaran tangan 4D, dan sistem pneumatik untuk pengaturan tinggi. Ideal untuk WFH dan kerja panjang.",
    price: 1850000,
    originalPrice: 2500000,
    discount: 26,
    images: [
      "https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-6",
    categoryName: "Rumah & Dapur",
    sellerId: "seller-1",
    sellerName: "Toko Elektronik Jaya",
    sellerCity: "Jakarta Barat",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TEJ&backgroundColor=10b981",
    rating: 4.6,
    reviewCount: 678,
    soldCount: 2100,
    stock: 45,
    weight: 12000,
    variantGroups: [
      {
        id: "vg-9",
        name: "Warna",
        variants: [
          { id: "v-32", name: "Warna", value: "Hitam", stock: 30 },
          { id: "v-33", name: "Warna", value: "Abu-abu", stock: 15 },
        ],
      },
    ],
    tags: ["kursi", "kantor", "ergonomis", "wfh", "mesh"],
    createdAt: "2026-02-20T08:00:00Z",
  },
  {
    id: "prod-12",
    name: "Set Panci Anti Lengket Granite 5 in 1 - Cookware Premium",
    slug: "set-panci-anti-lengket-granite-5in1",
    description:
      "Set panci lengkap 5 buah dengan lapisan granite anti lengket. Bebas PFOA, aman untuk semua jenis kompor termasuk induksi. Terdiri dari panci sup, wajan, panci saus, steamer, dan wajan tumis.",
    price: 489000,
    originalPrice: 750000,
    discount: 35,
    images: [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop",
    ],
    categoryId: "cat-6",
    categoryName: "Rumah & Dapur",
    sellerId: "seller-3",
    sellerName: "Dapur Nusantara",
    sellerCity: "Surabaya",
    sellerAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DN&backgroundColor=f59e0b",
    rating: 4.7,
    reviewCount: 1120,
    soldCount: 5600,
    stock: 180,
    weight: 3500,
    tags: ["panci", "anti-lengket", "granite", "masak", "dapur"],
    isFeatured: true,
    createdAt: "2025-12-25T08:00:00Z",
  },
];

// Flash sale products
export const flashSaleProducts = products.filter((p) => p.isFlashSale);

// Featured products
export const featuredProducts = products.filter((p) => p.isFeatured);

// Latest products (sorted by date desc)
export const latestProducts = [...products].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getRelatedProducts(product: Product, limit = 6): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}
