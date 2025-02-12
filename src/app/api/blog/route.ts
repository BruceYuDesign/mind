import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const text = searchParams.get('text');

  const items = await prisma.blog.findMany({
    where: {
      ...(text ? { OR: [
        { title: { contains: text }},
        { description: { contains: text }},
        { tags: { has: text }},
      ]} : {}),
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      tags: true,
      updated_at: true,
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    take: 6,
  });

  return new Response(JSON.stringify({
    code: 2000,
    message: 'SUCCESS',
    data: {
      items,
      pagination: {
        page: 2,
        perPage: 10,
        totalPages: 5,
        totalItems: 50,
        hasNext: true,
        hasPrev: true,
      },
    },
  }), {
    status: 200,
  });
}


export async function POST(request: NextRequest) {
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
    return new Response(JSON.stringify({
      code: 2000,
      message: 'SUCCESS',
      data: { id },
    }), {
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({
      code: 5001,
      message: 'ERROR: Internal Server Error',
      data: null,
    }), {
      status: 200,
    });
  }
}