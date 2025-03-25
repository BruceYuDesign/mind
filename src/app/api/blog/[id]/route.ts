import type { NextRequest } from 'next/server';
import { parse } from 'node-html-parser';
import { blogValidator } from '@/utils/data-validator';
import { prisma } from '@/app/api/utils/prisma';
import { getSession } from '@/app/api/utils/auth';
import { responseHandler, requestHandler, responseDict } from '@/app/api/utils/http-handler';


export const PUT = (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => requestHandler(async function() {
  // 檢查是否有 session
  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return responseHandler(responseDict.CLIENT_ERROR.UNAUTHORIZED);
  }

  const { id } = await params;
  const requestData = await request.json();

  if (!blogValidator(requestData).isVerify()) {
    return responseHandler(responseDict.CLIENT_ERROR.BAD_REQUEST);
  }

  const {
    title,
    description,
    thumbnail,
    content,
  } = requestData;

  const data = await prisma.blog.update({
    where: { id, author_id: session.user.id },
    data: {
      slug: encodeURI(title.replace(/\s+/g, '-')),
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
  // 檢查是否有 session
  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return responseHandler(responseDict.CLIENT_ERROR.UNAUTHORIZED);
  }

  const { id } = await params;

  await prisma.blog.delete({
    where: { id, author_id: session.user.id },
  });

  return responseHandler(responseDict.SUCCESS.DELETE_SUCCESSFUL);
});