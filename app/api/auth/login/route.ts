// import prisma from '@/lib/db';
import { signInSchema } from '@/schema/schema';
import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react';
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const validatedData = signInSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(validatedData.error.errors, { status: 400 });
    }

    // const user = await prisma.user.findFirst({
    //   where: {
    //     username: validatedData.data.username,
    //   },
    // });
    // if (!user) {
    //   return NextResponse.json('No user found', { status: 404 });
    // }
    // const compare = await bcrypt.compare(
    //   validatedData.data.password,
    //   user.hashedPassword
    // );

    // console.log(compare);
    const account = await signIn('credentials', {
      username: validatedData.data.username,
      password: validatedData.data.password,
      redirect: false,
    });
    console.log(account);

    return NextResponse.json('account');
  } catch (error) {
    return NextResponse.json(error);
  }
}
