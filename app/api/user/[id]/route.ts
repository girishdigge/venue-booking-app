import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
// import { SignUpSchema } from '@/schema/schema';

export async function GET(
  request: Request,
  { params }: any }
) {
  try {
    const awaitedParams = await params;
    const userId = awaitedParams?.id;

    const userData = await prisma?.user.findUnique({
      where: { id: userId },
    });
    const { hashedPassword, ...user } = userData;
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
