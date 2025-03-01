import type { NextRequest } from 'next/server';
import { parse } from 'node-html-parser';
import { prisma } from '@/app/api/utils/prisma';
import { responseHandler, requestHandler, responseDict } from '@/app/api/utils/http-handler';


export const PUT = (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => requestHandler(async function() {
  // TODO 從 cookie 中取得 author_id

  const { id } = await params;
  const {
    title,
    description,
    thumbnail,
    content,
  } = await request.json();

  // TODO 確認是否為該使用者的 blog
  const author_id = 'default_user';

  const data = await prisma.blog.update({
    where: { id, author_id },
    data: {
      slug: encodeURI(title).replace(/\s+/g, '-'),
      title,
      description: description || parse(content).innerText.slice(0, 30),
      thumbnail,
      content,
    },
  });

  return responseHandler(responseDict.SUCCESS.UPDATE_SUCCESSFUL, data);
});


export const DELETE = (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => requestHandler(async function() {
  // TODO 從 cookie 中取得 author_id

  const { id } = await params;

  // TODO 確認是否為該使用者的 blog
  const author_id = 'default_user';

  await prisma.blog.delete({
    where: { id, author_id },
  });

  return responseHandler(responseDict.SUCCESS.DELETE_SUCCESSFUL);
});