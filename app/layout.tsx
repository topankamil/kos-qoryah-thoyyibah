import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kost Nyaman Sejahtera - Kost Strategis di Depok",
  description: "Kost nyaman dengan fasilitas lengkap di Depok. WiFi 100Mbps, AC, kamar mandi dalam, parkir luas, dekat kampus. Harga mulai 1.5jt/bulan.",
  keywords: "kost depok, kost margonda, kost ui, kost murah depok, kost fasilitas lengkap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
