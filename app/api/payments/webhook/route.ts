import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { MidtransService } from "@/lib/midtrans"

// POST - Handle Midtrans payment notification
export async function POST(request: NextRequest) {
  try {
    const notification = await request.json()

    console.log("Midtrans notification:", notification)

    // Verify signature
    const isValid = MidtransService.verifySignature(notification)
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 }
      )
    }

    const {
      transaction_status,
      fraud_status,
      order_id,
      payment_type,
      gross_amount,
    } = notification

    // Map Midtrans status to our status
    const paymentStatus = MidtransService.mapStatus(
      transaction_status,
      fraud_status
    )

    // Find payment by transaction ID
    const payment = await prisma.payment.findFirst({
      where: { transactionId: order_id },
      include: {
        booking: {
          include: {
            room: true,
            user: true,
          }
        }
      }
    })

    if (!payment) {
      console.error("Payment not found for order_id:", order_id)
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 }
      )
    }

    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: paymentStatus,
        paidAt: paymentStatus === "SUCCESS" ? new Date() : payment.paidAt,
        metadata: {
          ...(payment.metadata as any),
          last_notification: notification,
          payment_type,
        }
      }
    })

    // If payment success, update booking status
    if (paymentStatus === "SUCCESS") {
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: {
          status: "PAID"
        }
      })

      // TODO: Send email confirmation to user
      // TODO: Send notification to admin

      console.log(`Payment SUCCESS for booking ${payment.bookingId}`)
    }

    // If payment failed/expired
    if (paymentStatus === "FAILED" || paymentStatus === "EXPIRED") {
      // Increase room availability back
      await prisma.room.update({
        where: { id: payment.booking.roomId },
        data: {
          available: {
            increment: 1
          }
        }
      })

      console.log(`Payment ${paymentStatus} for booking ${payment.bookingId}`)
    }

    return NextResponse.json({
      success: true,
      message: "Notification processed"
    })
  } catch (error: any) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
