import type { NextRequest } from 'next/server';
import { prisma } from '@/app/api/utils/prisma';
import { responseHandler, requestHandler, responseDict } from '@/app/api/utils/http-handler';


export const GET = (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => requestHandler(async function() {
  const { id } = await params;
  const data = await prisma.blog.findUnique({
    where: { id },
  });
  return data
    ? responseHandler(responseDict.SUCCESS.GET_SUCCESSFUL, data)
    : responseHandler(responseDict.CLIENT_ERROR.NOT_FOUND);
});


export const PUT = (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => requestHandler(async function() {
  const { id } = await params;
  const {
    slug,
    title,
    description,
    thumbnail,
    tags,
  } = await request.json();
  const data = await prisma.blog.update({
    where: { id },
    data: {
      slug,
      title,
      description,
      thumbnail,
      tags,
    },
  });
  return responseHandler(responseDict.SUCCESS.UPDATE_SUCCESSFUL, data);
});


export const DELETE = (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => requestHandler(async function() {
  const { id } = await params;
  await prisma.blog.delete({
    where: { id },
  });
  return responseHandler(responseDict.SUCCESS.DELETE_SUCCESSFUL);
});