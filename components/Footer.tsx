import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { KOST_INFO } from "@/lib/dummyData";
import { getWhatsAppLink, formatWhatsAppMessage } from "@/lib/utils";

export default function Footer() {
  const whatsappUrl = getWhatsAppLink(
    KOST_INFO.phone,
    formatWhatsAppMessage()
  );

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              {KOST_INFO.name}
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Kost nyaman, aman, dan strategis di Depok. Cocok untuk mahasiswa
              dan pekerja profesional dengan fasilitas lengkap dan modern.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{KOST_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">+{KOST_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{KOST_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hubungi Kami</h3>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat via WhatsApp</span>
            </a>
            <p className="text-xs mt-4 text-gray-400">
              Respon cepat 24/7 untuk info dan booking kamar
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {KOST_INFO.name}. All rights
            reserved.
          </p>
          <p className="mt-2 text-gray-500 text-xs">
            Website demo - Gambar menggunakan placeholder dari Unsplash
          </p>
        </div>
      </div>
    </footer>
  );
}
