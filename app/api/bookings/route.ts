import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// GET - Get all bookings (with filters)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    const { searchParams } = new URL(request.url)
    
    const status = searchParams.get("status")
    const roomId = searchParams.get("roomId")
    const userId = searchParams.get("userId")

    const where: any = {}

    // Non-admin only see their own bookings
    if (user && user.role !== "ADMIN") {
      where.userId = user.id
    }

    // Filters
    if (status) where.status = status
    if (roomId) where.roomId = roomId
    if (userId && user?.role === "ADMIN") where.userId = userId

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        room: {
          select: {
            id: true,
            name: true,
            type: true,
            price: true,
            images: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          }
        },
        payment: true,
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({
      success: true,
      data: bookings,
      count: bookings.length
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST - Create new booking
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Please login" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { roomId, startDate, durationMonths, notes } = body

    // Validation
    if (!roomId || !startDate || !durationMonths) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check room availability
    const room = await prisma.room.findUnique({
      where: { id: roomId }
    })

    if (!room) {
      return NextResponse.json(
        { success: false, error: "Room not found" },
        { status: 404 }
      )
    }

    if (room.available <= 0) {
      return NextResponse.json(
        { success: false, error: "Room is not available" },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = Number(room.price) * durationMonths

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        roomId,
        userId: user.id,
        startDate: new Date(startDate),
        durationMonths: parseInt(durationMonths),
        totalAmount,
        status: "PENDING",
        notes,
      },
      include: {
        room: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          }
        }
      }
    })

    // TODO: Send notification to admin
    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      data: booking
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
