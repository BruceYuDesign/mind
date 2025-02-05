import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function POST(request: any) {
  try {
    const {
      authorId,
      slug,
      title,
      description,
      thumbnail,
      tags,
    } = await request.json();
    const { id } = await prisma.blog.create({
      data: {
        authorId,
        slug,
        title,
        description,
        thumbnail,
        tags,
      },
    });
    return new Response(JSON.stringify({ id }), { status: 200 });
  } catch (error) {
    return new Response('ERROR: Creating Blog', { status: 500 });
  }
}