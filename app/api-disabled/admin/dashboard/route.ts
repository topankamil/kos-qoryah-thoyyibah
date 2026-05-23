import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

// GET - Admin dashboard statistics
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    // Get counts
    const [
      totalRooms,
      availableRooms,
      totalBookings,
      pendingBookings,
      approvedBookings,
      paidBookings,
      totalUsers,
      totalRevenue,
      pendingReviews,
    ] = await Promise.all([
      // Total rooms
      prisma.room.count({ where: { isActive: true } }),
      
      // Available rooms
      prisma.room.aggregate({
        where: { isActive: true },
        _sum: { available: true }
      }),
      
      // Total bookings
      prisma.booking.count(),
      
      // Pending bookings
      prisma.booking.count({ where: { status: "PENDING" } }),
      
      // Approved bookings
      prisma.booking.count({ where: { status: "APPROVED" } }),
      
      // Paid bookings
      prisma.booking.count({ where: { status: "PAID" } }),
      
      // Total users
      prisma.user.count({ where: { role: "USER" } }),
      
      // Total revenue (from paid bookings)
      prisma.booking.aggregate({
        where: { status: "PAID" },
        _sum: { totalAmount: true }
      }),
      
      // Pending reviews
      prisma.review.count({ where: { status: "PENDING" } }),
    ])

    // Recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        room: {
          select: {
            name: true,
            type: true,
          }
        },
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    })

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyRevenue = await prisma.$queryRaw<any[]>`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        SUM("totalAmount") as revenue,
        COUNT(*) as count
      FROM bookings
      WHERE status = 'PAID'
        AND "createdAt" >= ${sixMonthsAgo}
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month DESC
    `

    // Room occupancy rate
    const roomOccupancy = await prisma.room.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        type: true,
        available: true,
        _count: {
          select: {
            bookings: {
              where: { status: { in: ["APPROVED", "PAID"] } }
            }
          }
        }
      }
    })

    const occupancyData = roomOccupancy.map(room => ({
      name: room.name,
      type: room.type,
      available: room.available,
      occupied: room._count.bookings,
      occupancyRate: room.available > 0 
        ? ((room._count.bookings / (room._count.bookings + room.available)) * 100).toFixed(1)
        : 0
    }))

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalRooms,
          availableRooms: availableRooms._sum.available || 0,
          totalBookings,
          pendingBookings,
          approvedBookings,
          paidBookings,
          totalUsers,
          totalRevenue: Number(totalRevenue._sum.totalAmount || 0),
          pendingReviews,
        },
        recentBookings,
        monthlyRevenue: monthlyRevenue.map(m => ({
          month: m.month,
          revenue: Number(m.revenue),
          count: Number(m.count),
        })),
        roomOccupancy: occupancyData,
      }
    })
  } catch (error: any) {
    if (error.message === "Forbidden - Admin only") {
      return NextResponse.json(
        { success: false, error: "Admin only" },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
