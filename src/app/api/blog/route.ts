import type { NextRequest } from 'next/server';
import { prisma } from '@/app/api/utils/prisma';
import { responseHandler, requestHandler, responseDict } from '@/app/api/utils/http-handler';


export const GET = (request: NextRequest) => requestHandler(async function() {
  const { searchParams } = request.nextUrl;
  const searchText = searchParams.get('text');
  const searchPage = Number(searchParams.get('page')) || 1;
  const perPage = 12;

  const condition = {
    ...(searchText ? { OR: [
      { title: { contains: searchText }},
      { description: { contains: searchText }},
      { tags: { has: searchText }},
    ]} : {}),
  }

  const [totalItems, items] = await prisma.$transaction([
    prisma.blog.count({ where: condition }),
    prisma.blog.findMany({
      where: condition,
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
      take: perPage,
      skip: (searchPage - 1) * perPage,
      orderBy: {
        updated_at: 'desc',
      },
    }),
  ]);

  return responseHandler(responseDict.SUCCESS.GET_SUCCESSFUL, {
    items,
    pagenation: {
      page: searchPage,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems,
    },
  });
});


export const POST = (request: NextRequest) => requestHandler(async function() {
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

  return responseHandler(responseDict.SUCCESS.CREATE_SUCCESSFUL, { id });
});