import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { MidtransService } from "@/lib/midtrans"

// POST - Create payment for booking
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
    const { bookingId, paymentMethod } = body

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        room: true,
        user: true,
      }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      )
    }

    // Check permission
    if (booking.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      )
    }

    // Check if booking is approved
    if (booking.status !== "APPROVED") {
      return NextResponse.json(
        { success: false, error: "Booking must be approved first" },
        { status: 400 }
      )
    }

    // Check if payment already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { bookingId }
    })

    if (existingPayment && existingPayment.status === "SUCCESS") {
      return NextResponse.json(
        { success: false, error: "Payment already completed" },
        { status: 400 }
      )
    }

    const orderId = `ORDER-${bookingId.slice(0, 8)}-${Date.now()}`
    const amount = Number(booking.totalAmount)

    let payment

    if (paymentMethod === "QRIS" || paymentMethod === "EWALLET" || paymentMethod === "BANK_TRANSFER") {
      // Create Midtrans transaction
      const midtransResponse = await MidtransService.createTransaction({
        orderId,
        amount,
        customerDetails: {
          first_name: booking.user.name || "Customer",
          email: booking.user.email,
          phone: booking.user.phone || "08123456789",
        },
        itemDetails: [{
          id: booking.room.id,
          name: `Sewa ${booking.room.name} - ${booking.durationMonths} bulan`,
          price: amount,
          quantity: 1,
        }]
      })

      // Create or update payment record
      payment = await prisma.payment.upsert({
        where: { bookingId },
        create: {
          bookingId,
          amount,
          paymentMethod,
          paymentProvider: "midtrans",
          transactionId: orderId,
          status: "PENDING",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          metadata: {
            snapToken: midtransResponse.token,
            redirectUrl: midtransResponse.redirectUrl,
          }
        },
        update: {
          transactionId: orderId,
          status: "PENDING",
          metadata: {
            snapToken: midtransResponse.token,
            redirectUrl: midtransResponse.redirectUrl,
          }
        }
      })

      return NextResponse.json({
        success: true,
        data: {
          payment,
          snapToken: midtransResponse.token,
          redirectUrl: midtransResponse.redirectUrl,
        }
      })
    } else {
      // Manual payment (CASH)
      payment = await prisma.payment.upsert({
        where: { bookingId },
        create: {
          bookingId,
          amount,
          paymentMethod: "CASH",
          paymentProvider: "manual",
          status: "PENDING",
        },
        update: {
          status: "PENDING",
        }
      })

      return NextResponse.json({
        success: true,
        message: "Please complete cash payment",
        data: payment
      })
    }
  } catch (error: any) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// GET - Get payment by booking ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get("bookingId")

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: "bookingId required" },
        { status: 400 }
      )
    }

    const payment = await prisma.payment.findUnique({
      where: { bookingId },
      include: {
        booking: {
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
        }
      }
    })

    if (!payment) {
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: payment
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
