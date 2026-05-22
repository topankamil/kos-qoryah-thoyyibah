"use client";

import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { KOST_INFO } from "@/lib/dummyData";
import { getWhatsAppLink, formatWhatsAppMessage } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = getWhatsAppLink(
    KOST_INFO.phone,
    formatWhatsAppMessage()
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">KN</span>
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              {KOST_INFO.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="#kamar"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Kamar
            </Link>
            <Link
              href="#fasilitas"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Fasilitas
            </Link>
            <Link
              href="#lokasi"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Lokasi
            </Link>
            <Link
              href="#kontak"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Kontak
            </Link>
          </div>

          {/* WhatsApp Button */}
          <div className="flex items-center space-x-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="#kamar"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kamar
              </Link>
              <Link
                href="#fasilitas"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fasilitas
              </Link>
              <Link
                href="#lokasi"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Lokasi
              </Link>
              <Link
                href="#kontak"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontak
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
