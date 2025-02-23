import type { NextRequest } from 'next/server';
import { prisma } from '@/app/api/utils/prisma';
import { responseHandler, requestHandler, responseDict } from '@/app/api/utils/http-handler';


// export const GET = (
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) => requestHandler(async function() {
//   const { id } = await params;

//   const data = await prisma.blog.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       slug: true,
//       title: true,
//       description: true,
//       content: true,
//       thumbnail: true,
//       updated_at: true,
//       author: {
//         select: {
//           id: true,
//           name: true,
//           avatar: true,
//         },
//       },
//     },
//   });

//   return data
//     ? responseHandler(responseDict.SUCCESS.GET_SUCCESSFUL, data)
//     : responseHandler(responseDict.CLIENT_ERROR.NOT_FOUND);
// });


export const PUT = (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => requestHandler(async function() {
  // TODO 從 cookie 中取得 author_id

  const { id } = await params;
  const {
    // slug,
    title,
    description,
    thumbnail,
    content,
  } = await request.json();

  // TODO 確認是否為該使用者的 blog

  const data = await prisma.blog.update({
    where: { id },
    data: {
      slug: '', // TODO 後端生成 slug
      title,
      description,
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

  await prisma.blog.delete({
    where: { id },
  });

  return responseHandler(responseDict.SUCCESS.DELETE_SUCCESSFUL);
});