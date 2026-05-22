import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// GET - Get booking by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        room: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            ktp_number: true,
          }
        },
        payment: true,
      }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      )
    }

    // Check permission
    if (user?.role !== "ADMIN" && booking.userId !== user?.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      data: booking
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PATCH - Update booking (Admin: approve/reject, User: cancel)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { status, adminNotes } = body

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { room: true }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      )
    }

    // Permission check
    const isAdmin = user.role === "ADMIN"
    const isOwner = booking.userId === user.id

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      )
    }

    // Admin can approve/reject
    if (isAdmin && (status === "APPROVED" || status === "REJECTED")) {
      const updated = await prisma.booking.update({
        where: { id },
        data: {
          status,
          adminNotes,
        },
        include: {
          room: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      })

      // If approved, decrease room availability
      if (status === "APPROVED") {
        await prisma.room.update({
          where: { id: booking.roomId },
          data: {
            available: {
              decrement: 1
            }
          }
        })
      }

      // TODO: Send email notification to user

      return NextResponse.json({
        success: true,
        message: `Booking ${status.toLowerCase()}`,
        data: updated
      })
    }

    // User can only cancel
    if (isOwner && status === "CANCELLED") {
      const updated = await prisma.booking.update({
        where: { id },
        data: { status: "CANCELLED" }
      })

      // If was approved, increase room availability back
      if (booking.status === "APPROVED" || booking.status === "PAID") {
        await prisma.room.update({
          where: { id: booking.roomId },
          data: {
            available: {
              increment: 1
            }
          }
        })
      }

      return NextResponse.json({
        success: true,
        message: "Booking cancelled",
        data: updated
      })
    }

    return NextResponse.json(
      { success: false, error: "Invalid operation" },
      { status: 400 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Delete booking (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()

    if (user?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Admin only" },
        { status: 403 }
      )
    }

    await prisma.booking.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: "Booking deleted"
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
