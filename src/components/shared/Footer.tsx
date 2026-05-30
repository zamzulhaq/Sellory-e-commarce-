import Link from "next/link";
import {
  MessageCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Camera,
  Users,
} from "lucide-react";

const footerLinks = {
  perusahaan: [
    { label: "Tentang Sellory", href: "#" },
    { label: "Blog & Berita", href: "#" },
    { label: "Karir", href: "#" },
    { label: "Press & Media", href: "#" },
  ],
  layanan: [
    { label: "Cara Belanja", href: "#" },
    { label: "Cara Berjualan", href: "#" },
    { label: "Pusat Bantuan", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
  ],
  kategori: [
    { label: "Elektronik", href: "/kategori/elektronik" },
    { label: "Fashion", href: "/kategori/fashion-pria" },
    { label: "Makanan & Minuman", href: "/kategori/makanan-minuman" },
    { label: "Kesehatan", href: "/kategori/kesehatan-kecantikan" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-base">S</span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">sellory</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Platform marketplace modern untuk UMKM Indonesia. Jual beli lebih mudah, cepat, dan terpercaya.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={14} className="text-emerald-400 flex-shrink-0" />
                <span>support@sellory.id</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={14} className="text-emerald-400 flex-shrink-0" />
                <span>0800-1234-5678 (Bebas Pulsa)</span>
              </div>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Jl. Sudirman No. 1, Jakarta Selatan 12190</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {key === "perusahaan" ? "Perusahaan" : key === "layanan" ? "Layanan" : "Kategori Populer"}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">METODE PEMBAYARAN</p>
              <div className="flex flex-wrap gap-2">
                {["BCA", "Mandiri", "BRI", "BNI", "GoPay", "OVO", "DANA", "QRIS", "COD"].map(
                  (method) => (
                    <span
                      key={method}
                      className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-md font-medium"
                    >
                      {method}
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">KURIR PENGIRIMAN</p>
              <div className="flex flex-wrap gap-2">
                {["JNE", "J&T", "SiCepat", "Anteraja", "GoSend"].map((courier) => (
                  <span
                    key={courier}
                    className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-md font-medium"
                  >
                    {courier}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">IKUTI KAMI</p>
              <div className="flex gap-3">
                {[
                  { Icon: Users, href: "#" },
                  { Icon: Camera, href: "#" },
                  { Icon: MessageCircle, href: "#" },
                  { Icon: Globe, href: "#" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-8 h-8 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon size={14} className="text-gray-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © 2026 Sellory. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-300 transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Peta Situs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
