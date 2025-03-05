import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const rollNoParam = url.searchParams.get('rollNo')
  if (!rollNoParam) {
    return NextResponse.json({ error: 'Missing rollNo query parameter' }, { status: 400 })
  }
  const rollNo = parseInt(rollNoParam)

  try {
    const record = await prisma.attendance.findUnique({
      where: { studentRollNo: rollNo },
    })
    if (!record) {
      return NextResponse.json({ error: 'Attendance record not found' }, { status: 404 })
    }
    return NextResponse.json(record)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance record' }, { status: 500 })
  }
}