import Link from "next/link";
import { CheckCircle2, FileText, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { generateInvoiceNumber, formatDateTime } from "@/lib/utils";

export default function OrderSuccessPage() {
  const invoiceNumber = generateInvoiceNumber();
  const date = formatDateTime(new Date().toISOString());

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center border border-gray-100 shadow-xl shadow-emerald-900/5">
          {/* Icon */}
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
            <CheckCircle2 size={48} className="text-emerald-500 relative z-10" />
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
            Hore! Pesanan Berhasil 🎉
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Terima kasih telah berbelanja di Sellory. Pesanan kamu sedang diproses oleh penjual.
          </p>

          {/* Invoice Info */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left border border-gray-100">
            <div className="flex items-start justify-between mb-3 border-b border-gray-200 pb-3">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Nomor Invoice</p>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <FileText size={14} className="text-emerald-500" />
                  {invoiceNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-0.5">Tanggal Pembelian</p>
                <p className="text-sm font-semibold text-gray-700">{date}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Detail pesanan dan resi pengiriman akan dikirimkan ke email kamu dan bisa dicek pada halaman pesanan.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Cek Status Pesanan
            </Link>
            <Link
              href="/"
              className="w-full bg-white border border-gray-200 hover:border-emerald-500 text-gray-700 hover:text-emerald-600 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Lanjut Belanja <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
