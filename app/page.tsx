import Image from "next/image";
import Link from "next/link";
import {
  Wifi,
  Car,
  Shield,
  Waves,
  Zap,
  Users,
  Star,
  MapPin,
  MessageCircle,
  QrCode,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoomCard from "@/components/RoomCard";
import { ROOMS, KOST_INFO, TESTIMONIALS } from "@/lib/dummyData";
import { getWhatsAppLink, formatWhatsAppMessage } from "@/lib/utils";

export default function HomePage() {
  const whatsappUrl = getWhatsAppLink(
    KOST_INFO.phone,
    formatWhatsAppMessage()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80"
            alt="Hero"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Kost Nyaman di Depok
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Lokasi strategis, fasilitas lengkap, harga terjangkau
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kamar"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Lihat Kamar
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Hubungi Kami
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Wifi className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">WiFi Kencang</h3>
              <p className="text-sm text-gray-600">100 Mbps</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Keamanan 24/7</h3>
              <p className="text-sm text-gray-600">CCTV + Security</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Car className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Parkir Luas</h3>
              <p className="text-sm text-gray-600">Motor & Mobil</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Lokasi Strategis</h3>
              <p className="text-sm text-gray-600">Dekat kampus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="kamar" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pilihan Kamar
            </h2>
            <p className="text-xl text-gray-600">
              Berbagai tipe kamar dengan fasilitas lengkap
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ROOMS.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="fasilitas" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fasilitas Umum
            </h2>
            <p className="text-xl text-gray-600">
              Kenyamanan dan kemudahan untuk penghuni
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {KOST_INFO.facilities.map((facility, index) => {
              const icons = [
                Wifi,
                Waves,
                Car,
                Shield,
                Users,
                Waves,
                Zap,
                Users,
                Users,
                Users,
              ];
              const Icon = icons[index] || Users;
              const colors = [
                "blue",
                "green",
                "purple",
                "red",
                "yellow",
                "indigo",
                "pink",
                "cyan",
                "orange",
                "teal",
              ];
              const color = colors[index] || "gray";

              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-8 h-8 text-${color}-600`} />
                  </div>
                  <h3 className="text-center font-semibold text-gray-900">
                    {facility}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kata Penghuni
            </h2>
            <p className="text-xl text-gray-600">
              Pengalaman mereka yang sudah tinggal di sini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="lokasi" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lokasi Strategis
            </h2>
            <p className="text-xl text-gray-600">
              Dekat dengan berbagai tempat penting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
              <iframe
                src={KOST_INFO.maps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Nearby Places */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Dekat Dengan:
              </h3>
              {KOST_INFO.nearbyPlaces.map((place, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {place.name}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {place.type}
                      </p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {place.distance}
                  </span>
                </div>
              ))}

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Alamat Lengkap</h4>
                    <p className="text-gray-700">{KOST_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Metode Pembayaran
            </h2>
            <p className="text-xl text-gray-600">
              Mudah dan aman dengan berbagai pilihan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Transfer Bank */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-4">🏦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Transfer Bank
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700 font-semibold">BCA, Mandiri</p>
                <p className="text-gray-700 font-semibold">BNI, BRI</p>
              </div>
            </div>

            {/* E-Wallet */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                E-Wallet
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700 font-semibold">GoPay, OVO</p>
                <p className="text-gray-700 font-semibold">DANA, ShopeePay</p>
              </div>
            </div>

            {/* QRIS */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-4">
                <QrCode className="w-16 h-16 mx-auto text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">QRIS</h3>
              <p className="text-gray-700">Scan & bayar langsung</p>
              <p className="text-sm text-gray-500 mt-2">
                Semua aplikasi e-wallet & m-banking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="kontak" className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Siap Tinggal di Kost Kami?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Hubungi kami sekarang untuk info lebih lanjut atau booking kamar
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            <MessageCircle className="mr-3 w-6 h-6" />
            Chat WhatsApp Sekarang
          </a>
          <p className="mt-6 text-blue-200 text-sm">
            Respon cepat • Info lengkap • Booking mudah
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
