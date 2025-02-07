import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function POST(request: Request) {
  try {
    const {
      author_id,
      slug,
      title,
      description,
      thumbnail,
      tags,
    } = await request.json();
    const { id } = await prisma.blog.create({
      data: {
        author_id,
        slug,
        title,
        description,
        thumbnail,
        tags,
      },
    });
    return new Response(JSON.stringify({ id }), { status: 200 });
  } catch {
    return new Response('ERROR: Creating Blog', { status: 500 });
  }
}