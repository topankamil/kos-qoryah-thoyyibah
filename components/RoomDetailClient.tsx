"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
  MapPin,
  Ruler,
  Building2,
  Check,
  QrCode,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { KOST_INFO } from "@/lib/dummyData";
import { getWhatsAppLink, formatWhatsAppMessage, formatPrice } from "@/lib/utils";

// Room interface
interface Room {
  id: number;
  slug: string;
  name: string;
  type: string;
  price: number;
  size: string;
  floor: number;
  available: number;
  description: string;
  facilities: string[];
  images: string[];
  videoUrl?: string;
}

interface RoomDetailClientProps {
  room: Room;
}

export default function RoomDetailClient({ room }: RoomDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showQRIS, setShowQRIS] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  const whatsappUrl = getWhatsAppLink(
    KOST_INFO.phone,
    formatWhatsAppMessage(room.name)
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/#kamar" className="hover:text-blue-600">
              Kamar
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-semibold">{room.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-[400px] md:h-[500px] bg-gray-900">
                <Image
                  src={room.images[currentImageIndex]}
                  alt={`${room.name} - Photo ${currentImageIndex + 1}`}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => setShowLightbox(true)}
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {room.images.length}
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/20 text-6xl font-bold transform -rotate-12">
                    SAMPLE
                  </span>
                </div>
              </div>

              <div className="p-4 bg-gray-50">
                <div className="grid grid-cols-4 gap-2">
                  {room.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden cursor-pointer ${
                        currentImageIndex === index
                          ? "ring-2 ring-blue-600"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {room.videoUrl && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Virtual Tour 360°
                  </h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={room.videoUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    * Video contoh - akan diganti dengan video kamar asli
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Deskripsi
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {room.description}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Fasilitas Kamar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.facilities.map((facility, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {room.type}
                </span>
                <h1 className="text-2xl font-bold text-gray-900">
                  {room.name}
                </h1>
              </div>

              <div className="mb-6 pb-6 border-b">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {formatPrice(room.price)}
                </div>
                <p className="text-gray-600">per bulan</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <Ruler className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Ukuran: {room.size}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Building2 className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Lantai {room.floor}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    {room.available > 0 ? (
                      <span className="text-green-600 font-semibold">
                        {room.available} kamar tersedia
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Penuh
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat WhatsApp
                </a>
                <button
                  onClick={() => setShowQRIS(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Bayar via QRIS
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Informasi Penting
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Deposit 1 bulan</li>
                  <li>• Minimal sewa 3 bulan</li>
                  <li>• Termasuk service charge</li>
                  <li>• Listrik & air terpisah</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={room.images[currentImageIndex]}
              alt={`${room.name} - Photo ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
            {currentImageIndex + 1} / {room.images.length}
          </div>
        </div>
      )}

      {showQRIS && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Pembayaran QRIS
              </h3>
              <button
                onClick={() => setShowQRIS(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl border-4 border-gray-200 mb-6">
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <QrCode className="w-24 h-24 mx-auto mb-4" />
                  <p className="text-sm">QR Code QRIS</p>
                  <p className="text-xs opacity-75 mt-2">
                    (Dummy - akan diganti dengan QRIS asli)
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 mb-2">Total Pembayaran</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(room.price)}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Cara Pembayaran:
              </h4>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. Buka aplikasi e-wallet atau m-banking</li>
                <li>2. Pilih menu Scan QR / QRIS</li>
                <li>3. Scan kode QR di atas</li>
                <li>4. Konfirmasi pembayaran</li>
                <li>5. Screenshot bukti transfer</li>
              </ol>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">
                Atau transfer ke rekening:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">BCA</span>
                  <button
                    onClick={() => copyToClipboard("1234567890")}
                    className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                  >
                    {copiedBank ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Salin
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono font-bold text-lg">1234567890</p>
                <p className="text-sm text-gray-600 mt-1">
                  a.n. {KOST_INFO.name}
                </p>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Kirim Bukti Transfer
            </a>
          </div>
        </div>
      )}
    </>
  );
}