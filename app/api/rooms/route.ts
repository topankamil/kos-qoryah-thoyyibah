import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filters
    const type = searchParams.get("type")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const floor = searchParams.get("floor")
    const availableOnly = searchParams.get("available") === "true"
    const search = searchParams.get("search")

    const where: any = {
      isActive: true,
    }

    // Filter by type
    if (type) {
      where.type = type
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    // Filter by floor
    if (floor) {
      where.floor = parseInt(floor)
    }

    // Filter available only
    if (availableOnly) {
      where.available = { gt: 0 }
    }

    // Search by name or description
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const rooms = await prisma.room.findMany({
      where,
      include: {
        _count: {
          select: {
            reviews: true,
            bookings: {
              where: { status: "PAID" }
            }
          }
        },
        reviews: {
          where: { status: "APPROVED" },
          select: {
            rating: true,
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    // Calculate average rating
    const roomsWithRating = rooms.map(room => {
      const ratings = room.reviews.map(r => r.rating)
      const avgRating = ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0

      return {
        ...room,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: room._count.reviews,
        bookingCount: room._count.bookings,
      }
    })

    return NextResponse.json({
      success: true,
      data: roomsWithRating,
      count: roomsWithRating.length
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
