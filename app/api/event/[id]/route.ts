import prisma from '@/lib/db';
export async function GET() {
  const data = await prisma.event.findFirst({
    where: { id: 1 },
  });
  console.log(data);
  return Response.json(data);
}
