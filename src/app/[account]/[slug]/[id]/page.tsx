import 'server-only';
import { prisma } from '@/app/api/utils/prisma';
import Link from 'next/link';
import Tools from './components/Tools';


interface BlogPageProps {
  params: {
    id: string;
  };
};


export default async function BlogPage(props: BlogPageProps) {


  const blogData = await prisma.blog.findUnique({
    where: {
      id: props.params.id,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      content: true,
      thumbnail: true,
      updated_at: true,
      author: {
        select: {
          name: true,
          account: true,
          avatar: true,
        },
      },
    },
  });


  // TODO 404 Redirect
  if (!blogData) {
    return (
      <div
        className='util-container
        w-screen h-screen flex items-center justify-center text-4xl'
      >
        404 ：）
      </div>
    );
  };


  return (
    <div className='util-container'>
      <Tools
        id={blogData.id}
        title={blogData.title}
        description={blogData.description}
        thumbnail={blogData.thumbnail || ''}
        content={blogData.content}
        account={blogData.author.account}
      />
      <Link
        href={`/${blogData.author.account}`}
        scroll={false}
      >
        {blogData.author.name}
      </Link>
      <div
        dangerouslySetInnerHTML={{
          __html: blogData.content,
        }}
      >
      </div>
    </div>
  );
};