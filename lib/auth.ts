import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      image: true,
      createdAt: true,
    }
  })

  return user
}

export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === "ADMIN"
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error("Unauthorized - Please login")
  }
  
  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  
  if (!user || user.role !== "ADMIN") {
    throw new Error("Forbidden - Admin only")
  }
  
  return user
}
