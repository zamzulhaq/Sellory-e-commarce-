// ============================================================
// Sellory - Type Definitions
// ============================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  productCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  stock: number;
  priceModifier?: number;
}

export interface ProductVariantGroup {
  id: string;
  name: string;
  variants: ProductVariant[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  categoryId: string;
  categoryName: string;
  sellerId: string;
  sellerName: string;
  sellerCity: string;
  sellerAvatar: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  weight: number; // gram
  variantGroups?: ProductVariantGroup[];
  tags: string[];
  isFlashSale?: boolean;
  flashSaleEndTime?: string;
  isFeatured?: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedVariants?: { groupName: string; variantName: string }[];
  sellerId: string;
  sellerName: string;
  weight: number;
  maxStock: number;
}

export interface CartGroup {
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  items: CartItem[];
}

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  detail: string;
  isDefault: boolean;
}

export interface Courier {
  id: string;
  name: string;
  service: string;
  estimatedDays: string;
  price: number;
  logo?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "bank_transfer" | "ewallet" | "cod" | "credit_card";
  logo?: string;
  description?: string;
}

export interface Voucher {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  expiredAt: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedVariants?: { groupName: string; variantName: string }[];
}

export interface Order {
  id: string;
  invoiceNumber: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  shippingAddress: Address;
  courier: string;
  trackingNumber?: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Seller {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  banner?: string;
  city: string;
  province: string;
  description: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  followerCount: number;
  joinedAt: string;
  isVerified: boolean;
  responseRate: number;
  responseTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "buyer" | "seller" | "admin";
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  bgColor: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: string;
}
