//// filepath: /Users/dhruvkoli/hukum/src/app/api/attendance/update/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { rollNo, field, newStatus } = body

    if (!rollNo || !field || !newStatus) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Allowed statuses: note "NoClass" (without space) is used in the database.
    const allowedStatuses = ["Present", "Absent", "NoClass", "Holiday"]
    if (!allowedStatuses.includes(newStatus)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 })
    }

    const dataToUpdate: any = {}
    dataToUpdate[field] = newStatus

    const updated = await prisma.attendance.update({
      where: { studentRollNo: rollNo },
      data: dataToUpdate,
    })

    return NextResponse.json({ success: true, updated })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update attendance" }, { status: 500 })
  }
}