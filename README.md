# 🏠 Website Kost Kosan Modern

Website kost-kosan full-featured dengan Next.js 14, Tailwind CSS, dan TypeScript. Menggunakan gambar dummy dari Unsplash dan video placeholder untuk demo.

## ✨ Fitur Lengkap

### 🎯 Fitur Utama
- ✅ **Homepage** dengan hero section, katalog kamar, testimonial
- ✅ **Detail Kamar** dengan galeri foto, virtual tour video, daftar fasilitas
- ✅ **WhatsApp Integration** - Chat langsung ke nomor kost
- ✅ **QRIS Payment Mockup** - Modal pembayaran dengan QR code dummy
- ✅ **Google Maps** - Lokasi kost dengan embed map
- ✅ **Responsive Design** - Mobile-first, tampil sempurna di semua device
- ✅ **Image Lightbox** - View foto full screen dengan navigasi
- ✅ **Smooth Scroll** - Navigasi smooth ke section

### 📸 Konten Dummy
- Gambar kamar dari **Unsplash** (high quality, gratis)
- Video tour dari **YouTube** (placeholder)
- Avatar testimonial dari **Pravatar**
- QR Code mockup untuk QRIS
- Google Maps embed (lokasi Depok)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 📁 Struktur Folder

```
kos-kosan-web/
├── app/
│   ├── kamar/
│   │   └── [slug]/
│   │       └── page.tsx          # Detail kamar (dynamic route)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css
├── components/
│   ├── Header.tsx                # Navigation bar
│   ├── Footer.tsx                # Footer dengan kontak
│   └── RoomCard.tsx              # Card untuk list kamar
├── lib/
│   ├── dummyData.ts              # Data kamar & kost (dummy)
│   └── utils.ts                  # Helper functions
└── README.md
```

## 🎨 Tipe Kamar

1. **Standard** - Rp 1.5jt/bulan (3x4m)
2. **Deluxe** - Rp 2jt/bulan (4x5m)
3. **Premium** - Rp 2.5jt/bulan (5x6m)
4. **Studio** - Rp 3jt/bulan (6x7m)

Setiap kamar punya 4 foto dummy + video tour.

## 🛠️ Instalasi & Setup

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production
```bash
npm run build
npm start
```

## 🔧 Kustomisasi

### 1. Ganti Informasi Kost

Edit file `lib/dummyData.ts`:

```typescript
export const KOST_INFO = {
  name: "Nama Kost Anda",
  address: "Alamat lengkap",
  phone: "628123456789",  // Format: 62 + nomor (tanpa 0)
  email: "email@kostanda.com",
  // ... dst
}
```

### 2. Ganti Gambar Real

**Cara 1: Ganti URL Unsplash**
```typescript
images: [
  "https://images.unsplash.com/photo-XXXXX?w=800&q=80",
  // Cari foto baru di unsplash.com, copy image URL
]
```

**Cara 2: Upload Gambar Sendiri**
1. Taruh foto di folder `public/images/`
2. Update path:
```typescript
images: [
  "/images/kamar-1.jpg",
  "/images/kamar-2.jpg",
]
```

### 3. Ganti Video Tour

```typescript
videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
```

Upload video tour ke YouTube, copy embed URL.

### 4. Setup QRIS Real

Untuk QRIS asli, integrasikan dengan payment gateway:

- **Midtrans**: https://midtrans.com
- **Xendit**: https://xendit.com  
- **Tripay**: https://tripay.co.id

Contoh integrasi ada di dokumentasi masing-masing provider.

### 5. Update Google Maps

Ganti coordinates & embed URL di `dummyData.ts`:

```typescript
maps: {
  lat: -6.XXXXX,    // Latitude kost
  lng: 106.XXXXX,   // Longitude kost
  embedUrl: "..."   // Dari Google Maps > Share > Embed
}
```

## 📱 WhatsApp Setup

Format nomor: `62` + nomor tanpa `0`

Contoh:
- ❌ `081234567890`
- ✅ `6281234567890`

Message otomatis include nama kamar kalau dari detail page.

## 🎯 Deployment

### Vercel (Recommended)
1. Push ke GitHub
2. Import di [vercel.com](https://vercel.com)
3. Deploy otomatis!

### Netlify
```bash
npm run build
```
Upload folder `.next` ke Netlify.

### VPS/Cloud
```bash
npm run build
npm start
```
Jalankan di port 3000 (atau custom).

## 🐛 Troubleshooting

### Build Error
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Image Loading Lambat
Tambahkan di `next.config.js`:
```javascript
images: {
  domains: ['images.unsplash.com', 'i.pravatar.cc'],
  deviceSizes: [640, 750, 828, 1080, 1200],
}
```

### WhatsApp Link Ga Buka
Pastikan format nomor: `62XXXXXXXXXX` (62 + nomor tanpa 0)

## 📝 TODO / Enhancement Ideas

- [ ] Admin dashboard untuk manage kamar
- [ ] Booking system dengan kalender
- [ ] Online payment real (Midtrans/Xendit)
- [ ] Chat widget (Tawk.to/LiveChat)
- [ ] Multi-language (EN/ID)
- [ ] Dark mode
- [ ] SEO optimization lanjutan
- [ ] Analytics (Google Analytics)
- [ ] Progressive Web App (PWA)
- [ ] Email notifications

## 🎨 Customization Tips

### Ganti Warna Brand
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {...},  // Ganti blue-600 jadi warna brand
}
```

### Tambah Kamar Baru
Tambahin object baru di `ROOMS` array di `dummyData.ts`.

### Hapus Watermark "SAMPLE"
Cari & hapus code ini di komponen:
```tsx
<span className="text-white/20 ...">SAMPLE</span>
```

## 📞 Support

Ada pertanyaan? Silakan create issue di GitHub atau hubungi developer.

## 📄 License

MIT License - Bebas dipakai untuk project apapun.

---

**Dibuat dengan ❤️ pakai Next.js & Tailwind CSS**

*Website demo dengan dummy content - siap dikustomisasi untuk kost real!*
