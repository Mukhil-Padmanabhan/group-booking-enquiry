import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { transformGroupBookingPayload } from '@/lib/api/groupBooking/transformPayload';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const booking = await prisma.groupBooking.create({
      data: transformGroupBookingPayload(body)
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('[POST /api/groups/submit]', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
