export interface Room {
  id: number;
  slug: string;
  name: string;
  type: string;
  price: number;
  available: number;
  facilities: string[];
  images: string[];
  videoUrl?: string;
  description: string;
  size: string;
  floor: number;
}

export const KOST_INFO = {
  name: "Kos Kos Ibu Wawa",
  address: "Perumahan Qoryah Thoyyibah, Ciburial, Kec. Leles, Kabupaten Garut, Jawa Barat 44152",
  phone: "6287827231359", // Format untuk WhatsApp (62 + nomor tanpa 0)
  email: "info@kostnyaman.com",
    maps: {
    lat: -7.118317721504637,   // ← Dari embed URL lu
    lng: 107.8932234670699,     // ← Dari embed URL lu
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1779485969475!6m8!1m7!1sIRYM7bpj3bHgTrVHWCfZVg!2m2!1d-7.118317721504637!2d107.8932234670699!3f299.99647364655686!4f-4.420671273221515!5f0.7820865974627469"
  },
  facilities: [
    "WiFi 100 Mbps",
    "Laundry",
    "Parkir Motor & Mobil",
    "CCTV 24 Jam",
    "Security",
    "Air PAM",
    "Listrik Token",
    "Dapur Bersama",
    "Ruang Tamu",
    "Jemuran"
  ],
  nearbyPlaces: [
    { name: "Universitas Garut", distance: "5 km", type: "kampus" },
    { name: "Alun-Alun Garut", distance: "8 km", type: "pusat kota" },
    { name: "Terminal Guntur", distance: "7 km", type: "transportasi" },
    { name: "Alfamart", distance: "500 m", type: "minimarket" },
    { name: "Puskesmas", distance: "2 km", type: "kesehatan" }
  ]
};

export const ROOMS: Room[] = [
  {
    id: 1,
    slug: "kamar-standard-a",
    name: "Kamar Standard Tipe A",
    type: "Standard",
    price: 1500000,
    available: 3,
    size: "3x4 meter",
    floor: 1,
    description: "Kamar nyaman dengan fasilitas lengkap, cocok untuk mahasiswa atau pekerja. Lokasi strategis dekat kampus dan stasiun.",
    facilities: [
      "Kasur Single + Spring Bed",
      "Lemari Pakaian",
      "Meja Belajar & Kursi",
      "AC",
      "Kamar Mandi Dalam",
      "Water Heater",
      "Jendela",
      "Listrik 450W"
    ],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80", // bedroom modern
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", // bedroom cozy
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", // bathroom
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", // desk area
    ],
    videoUrl: "https://www.youtube.com/embed/zumJJUL_ruM" // dummy interior tour
  },
  {
    id: 2,
    slug: "kamar-deluxe-b",
    name: "Kamar Deluxe Tipe B",
    type: "Deluxe",
    price: 2000000,
    available: 2,
    size: "4x5 meter",
    floor: 2,
    description: "Kamar luas dengan balkon pribadi dan pemandangan terbuka. Dilengkapi TV dan kulkas mini.",
    facilities: [
      "Kasur Queen + Spring Bed Premium",
      "Lemari Pakaian Besar",
      "Meja Belajar & Kursi Ergonomis",
      "AC Inverter",
      "Kamar Mandi Dalam + Bathub",
      "Water Heater",
      "TV LED 32 inch",
      "Kulkas Mini",
      "Balkon Pribadi",
      "Listrik 900W"
    ],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80", // luxury bedroom
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80", // modern room
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", // bathroom luxury
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80", // balcony view
    ],
    videoUrl: "https://www.youtube.com/embed/zumJJUL_ruM"
  },
  {
    id: 3,
    slug: "kamar-premium-c",
    name: "Kamar Premium Tipe C",
    type: "Premium",
    price: 2500000,
    available: 1,
    size: "5x6 meter",
    floor: 3,
    description: "Kamar premium dengan ruang kerja terpisah dan furniture lengkap. Cocok untuk profesional muda.",
    facilities: [
      "Kasur King Size + Spring Bed Premium",
      "Walk-in Closet",
      "Meja Kerja + Kursi Gaming",
      "Sofa Single",
      "AC Dual",
      "Kamar Mandi Dalam + Rain Shower",
      "Water Heater Premium",
      "TV Smart 43 inch",
      "Kulkas 2 Pintu",
      "Microwave",
      "Balkon Luas",
      "Listrik 1300W"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", // premium bedroom
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80", // luxury interior
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80", // modern bathroom
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80", // living area
    ],
    videoUrl: "https://www.youtube.com/embed/zumJJUL_ruM"
  },
  {
    id: 4,
    slug: "kamar-studio-d",
    name: "Kamar Studio Tipe D",
    type: "Studio",
    price: 3000000,
    available: 1,
    size: "6x7 meter",
    floor: 3,
    description: "Studio apartment dengan dapur kecil dan ruang tamu. Sempurna untuk pasangan atau yang menginginkan privasi maksimal.",
    facilities: [
      "Kasur King Size + Spring Bed Premium",
      "Walk-in Closet",
      "Meja Kerja Premium",
      "Sofa Bed",
      "AC Inverter 2 Unit",
      "Kamar Mandi + Bathub Jacuzzi",
      "Water Heater Premium",
      "TV Smart 50 inch",
      "Kulkas 2 Pintu",
      "Microwave & Rice Cooker",
      "Kompor Induksi",
      "Kitchen Set Mini",
      "Balkon Luas + Outdoor Furniture",
      "Listrik 2200W"
    ],
    images: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80", // studio apartment
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", // modern studio
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", // kitchen area
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80", // bathroom studio
    ],
    videoUrl: "https://www.youtube.com/embed/zumJJUL_ruM"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Mahasiswa UI",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment: "Kost nya nyaman banget, deket kampus, owner ramah, WiFi kenceng. Recommended!"
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    role: "Karyawan Swasta",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    comment: "Fasilitas lengkap, bersih, aman. Cocok buat yang kerja dari rumah."
  },
  {
    id: 3,
    name: "Ahmad Rizki",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 4,
    comment: "Harga worth it dengan fasilitas yang didapat. Ruang kerja nyaman buat WFH."
  }
];

export const PAYMENT_METHODS = [
  {
    id: 1,
    name: "Transfer Bank",
    banks: ["BCA", "Mandiri", "BNI", "BRI"],
    icon: "🏦"
  },
  {
    id: 2,
    name: "E-Wallet",
    options: ["GoPay", "OVO", "DANA", "ShopeePay"],
    icon: "📱"
  },
  {
    id: 3,
    name: "QRIS",
    description: "Scan QR Code untuk pembayaran",
    icon: "📷"
  }
];
