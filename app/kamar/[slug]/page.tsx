import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoomDetailClient from "@/components/RoomDetailClient";
import { ROOMS } from "@/lib/dummyData";

export default async function RoomDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <RoomDetailClient room={room} />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return ROOMS.map((room) => ({
    slug: room.slug,
  }));
}
