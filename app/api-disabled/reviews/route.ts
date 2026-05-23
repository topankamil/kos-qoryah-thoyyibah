import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// GET - Get reviews (filtered by room, user, or status)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const roomId = searchParams.get("roomId")
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    const where: any = {}

    // Public only sees approved reviews
    const user = await getCurrentUser()
    if (user?.role !== "ADMIN") {
      where.status = "APPROVED"
    } else if (status) {
      where.status = status
    }

    if (roomId) where.roomId = roomId
    if (userId) where.userId = userId

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        room: {
          select: {
            id: true,
            name: true,
            type: true,
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST - Create review (user must have completed booking)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { roomId, rating, comment, photos } = body

    // Validation
    if (!roomId || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1-5" },
        { status: 400 }
      )
    }

    // Check if user has completed booking for this room
    const hasBooking = await prisma.booking.findFirst({
      where: {
        userId: user.id,
        roomId,
        status: { in: ["PAID", "COMPLETED"] }
      }
    })

    if (!hasBooking) {
      return NextResponse.json(
        { success: false, error: "You must complete a booking before reviewing" },
        { status: 403 }
      )
    }

    // Check if user already reviewed this room
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: user.id,
        roomId,
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: "You already reviewed this room" },
        { status: 400 }
      )
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        roomId,
        userId: user.id,
        bookingId: hasBooking.id,
        rating: parseInt(rating),
        comment,
        photos: photos || [],
        status: "PENDING", // Needs admin approval
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        room: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    // TODO: Notify admin for review moderation

    return NextResponse.json({
      success: true,
      message: "Review submitted. Waiting for approval.",
      data: review
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
