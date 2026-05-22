import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Maximize, MessageCircle } from "lucide-react";
import { Room } from "@/lib/dummyData";
import { formatPrice } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden group">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {room.type}
          </span>
        </div>
        {/* Available Badge */}
        {room.available > 0 && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {room.available} Tersedia
            </span>
          </div>
        )}
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/20 text-6xl font-bold transform -rotate-12">
            SAMPLE
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2">{room.name}</h3>

        {/* Price */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-blue-600">
            {formatPrice(room.price)}
          </p>
          <p className="text-sm text-gray-500">per bulan</p>
        </div>

        {/* Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Maximize className="w-4 h-4 mr-2" />
            <span>Ukuran: {room.size}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Bed className="w-4 h-4 mr-2" />
            <span>Lantai {room.floor}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{room.facilities.length} Fasilitas</span>
          </div>
        </div>

        {/* Facilities Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {room.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {facility}
              </span>
            ))}
            {room.facilities.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                +{room.facilities.length - 3} lainnya
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/kamar/${room.slug}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
          >
            Lihat Detail
          </Link>
          <Link
            href={`/kamar/${room.slug}#kontak`}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
