import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@kostnyaman.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample rooms
  const rooms = [
    {
      slug: 'kamar-standard-a',
      name: 'Kamar Standard Tipe A',
      type: 'STANDARD',
      price: 1500000,
      size: '3x4 meter',
      floor: 1,
      available: 3,
      description: 'Kamar nyaman dengan fasilitas lengkap, cocok untuk mahasiswa atau pekerja. Lokasi strategis dekat kampus dan stasiun.',
      facilities: [
        'Kasur Single + Spring Bed',
        'Lemari Pakaian',
        'Meja Belajar & Kursi',
        'AC',
        'Kamar Mandi Dalam',
        'Water Heater',
        'Jendela',
        'Listrik 450W'
      ],
      images: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      ],
      videoUrl: 'https://www.youtube.com/embed/zumJJUL_ruM',
      isActive: true,
    },
    {
      slug: 'kamar-deluxe-b',
      name: 'Kamar Deluxe Tipe B',
      type: 'DELUXE',
      price: 2000000,
      size: '4x5 meter',
      floor: 2,
      available: 2,
      description: 'Kamar luas dengan balkon pribadi dan pemandangan terbuka. Dilengkapi TV dan kulkas mini.',
      facilities: [
        'Kasur Queen + Spring Bed Premium',
        'Lemari Pakaian Besar',
        'Meja Belajar & Kursi Ergonomis',
        'AC Inverter',
        'Kamar Mandi Dalam + Bathub',
        'Water Heater',
        'TV LED 32 inch',
        'Kulkas Mini',
        'Balkon Pribadi',
        'Listrik 900W'
      ],
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
        'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80',
      ],
      videoUrl: 'https://www.youtube.com/embed/zumJJUL_ruM',
      isActive: true,
    },
    {
      slug: 'kamar-premium-c',
      name: 'Kamar Premium Tipe C',
      type: 'PREMIUM',
      price: 2500000,
      size: '5x6 meter',
      floor: 3,
      available: 1,
      description: 'Kamar premium dengan ruang kerja terpisah dan furniture lengkap. Cocok untuk profesional muda.',
      facilities: [
        'Kasur King Size + Spring Bed Premium',
        'Walk-in Closet',
        'Meja Kerja + Kursi Gaming',
        'Sofa Single',
        'AC Dual',
        'Kamar Mandi Dalam + Rain Shower',
        'Water Heater Premium',
        'TV Smart 43 inch',
        'Kulkas 2 Pintu',
        'Microwave',
        'Balkon Luas',
        'Listrik 1300W'
      ],
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      ],
      videoUrl: 'https://www.youtube.com/embed/zumJJUL_ruM',
      isActive: true,
    },
    {
      slug: 'kamar-studio-d',
      name: 'Kamar Studio Tipe D',
      type: 'STUDIO',
      price: 3000000,
      size: '6x7 meter',
      floor: 3,
      available: 1,
      description: 'Studio apartment dengan dapur kecil dan ruang tamu. Sempurna untuk pasangan atau yang menginginkan privasi maksimal.',
      facilities: [
        'Kasur King Size + Spring Bed Premium',
        'Walk-in Closet',
        'Meja Kerja Premium',
        'Sofa Bed',
        'AC Inverter 2 Unit',
        'Kamar Mandi + Bathub Jacuzzi',
        'Water Heater Premium',
        'TV Smart 50 inch',
        'Kulkas 2 Pintu',
        'Microwave & Rice Cooker',
        'Kompor Induksi',
        'Kitchen Set Mini',
        'Balkon Luas + Outdoor Furniture',
        'Listrik 2200W'
      ],
      images: [
        'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
      ],
      videoUrl: 'https://www.youtube.com/embed/zumJJUL_ruM',
      isActive: true,
    },
  ]

  for (const roomData of rooms) {
    const room = await prisma.room.upsert({
      where: { slug: roomData.slug },
      update: {},
      create: roomData,
    })
    console.log('✅ Room created:', room.name)
  }

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
