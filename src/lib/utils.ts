/**
 * Utility functions for Sellory
 */

/**
 * Format number to Indonesian Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with Indonesian locale (without currency symbol)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

/**
 * Format large numbers to compact form (e.g., 12.4rb, 1.2jt)
 */
export function formatCompact(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}jt`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}rb`;
  }
  return num.toString();
}

/**
 * Calculate discount price
 */
export function calculateDiscountedPrice(price: number, discount: number): number {
  return Math.round(price * (1 - discount / 100));
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format datetime to Indonesian locale
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get order status label in Indonesian
 */
export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Menunggu Pembayaran",
    paid: "Sudah Dibayar",
    processing: "Diproses",
    shipped: "Dikirim",
    delivered: "Diterima",
    completed: "Selesai",
    cancelled: "Dibatalkan",
    refunded: "Dikembalikan",
  };
  return labels[status] || status;
}

/**
 * Get order status color classes
 */
export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    paid: "bg-blue-100 text-blue-700 border-blue-200",
    processing: "bg-indigo-100 text-indigo-700 border-indigo-200",
    shipped: "bg-cyan-100 text-cyan-700 border-cyan-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
    refunded: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Generate random invoice number
 */
export function generateInvoiceNumber(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 900000 + 100000);
  return `INV/${dateStr}/SEL/${random}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Calculate cart total
 */
export function calculateCartTotal(
  items: { price: number; quantity: number }[]
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Get rating stars as array
 */
export function getRatingStars(rating: number): { filled: boolean }[] {
  return Array.from({ length: 5 }, (_, i) => ({
    filled: i < Math.round(rating),
  }));
}
