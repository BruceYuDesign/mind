import type { NextRequest } from 'next/server';
import { parse } from 'node-html-parser';
import { blogValidator } from '@/utils/dataVerify';
import { prisma } from '@/app/api/utils/prisma';
import { responseHandler, requestHandler, responseDict } from '@/app/api/utils/http-handler';


export const GET = (request: NextRequest) => requestHandler(async function() {
  const { searchParams } = request.nextUrl;
  const searchAccount = searchParams.get('account');
  const searchText = searchParams.get('text');
  const searchPage = Number(searchParams.get('page')) || 1;
  const perPage = 12;

  const condition = {
    ...({
      AND: {
        ...(
          searchText
            ? { OR: [
              { title: { contains: searchText }},
              { description: { contains: searchText }},
            ]}
            : {}
        ),
        ...(
          searchAccount
            ? { author: { id: { contains: searchAccount } } }
            : {}
        ),
      },
    }),
  };

  const [totalItems, items] = await prisma.$transaction([
    prisma.blog.count({ where: condition }),
    prisma.blog.findMany({
      where: condition,
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        thumbnail: true,
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
  // TODO 從 cookie 中取得 author_id

  const {
    title,
    description,
    thumbnail,
    content,
  } = await request.json();

  const { author_id, id, slug } = await prisma.blog.create({
    data: {
      author_id: 'default_user', // TODO 串接使用者 id
      slug: encodeURI(title).replace(/\s+/g, '-'),
      title,
      description: description || parse(content).innerText.slice(0, 30),
      thumbnail,
      content,
    },
  });

  return responseHandler(responseDict.SUCCESS.CREATE_SUCCESSFUL, {
    author_id,
    id,
    slug,
  });
});