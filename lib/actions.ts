'use server';

import { EventSchema } from '@/schema/schema';
import { NextResponse } from 'next/server';

export const createEvent = async (data: EventSchema) => {
  try {
    const events = await prisma?.event.findFirst({
      where: { date: data.date },
    });

    console.log(events, data);
    if (events) {
      return 'event already exists';
    }
    return 'success';
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
};
