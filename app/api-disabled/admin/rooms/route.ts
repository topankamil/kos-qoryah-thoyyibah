import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

// POST - Create new room (Admin only)
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const {
      slug,
      name,
      type,
      price,
      size,
      floor,
      available,
      description,
      facilities,
      images,
      videoUrl,
    } = body

    // Validation
    if (!slug || !name || !type || !price || !size || !floor || available === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingRoom = await prisma.room.findUnique({
      where: { slug }
    })

    if (existingRoom) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 400 }
      )
    }

    const room = await prisma.room.create({
      data: {
        slug,
        name,
        type,
        price,
        size,
        floor: parseInt(floor),
        available: parseInt(available),
        description,
        facilities: facilities || [],
        images: images || [],
        videoUrl,
        isActive: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: "Room created successfully",
      data: room
    }, { status: 201 })
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
