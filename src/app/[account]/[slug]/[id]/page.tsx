import 'server-only';
import Link from 'next/link';
import { ModalProvider } from '@/context/ModalContext';
import { prisma } from '@/app/api/utils/prisma';
import AutherTools from './components/AutherTools';
import ReaderTools from './components/ReaderTools';
import UpdateBlogModal from './components/UpdateBlogModal';
import DeleteBlogModal from './components/DeleteBlogModal';


interface BlogPageProps {
  params: {
    id: string;
  };
};


export default async function BlogPage(props: BlogPageProps) {


  const getBlog = async () => {
    const data = await prisma.blog.findUnique({
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
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    return data;
  };


  const data = await getBlog();


  // TODO 404 Redirect
  if (!data) {
    return (
      <div
        className='util-container
        w-screen h-screen flex items-center justify-center text-4xl'
      >
        404 ：）
      </div>
    );
  };


  const toolbarButtons = () => {
    // TODO: compare account
    const isAuther = data.author.id === 'default_user';
    if (isAuther) {
      return (
        <ModalProvider>
          <AutherTools/>
          <UpdateBlogModal
            id={data.id}
            title={data.title}
            description={data.description}
            thumbnail={data.thumbnail || ''}
            content={data.content}
          />
          <DeleteBlogModal
            id={props.params.id}
          />
        </ModalProvider>
      )
    } else {
      return (
        <ReaderTools
          id={props.params.id}
          isCollected={false}
          isFollowed={false}
        />
      )
    }
  }


  return (
    <div className='util-container'>
      <ul className='flex flex-row gap-4'>
        {toolbarButtons()}
      </ul>
      <Link
        href={`/${data.author.id}`}
        scroll={false}
      >
        {data.author.name}
      </Link>
      <div
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      >
      </div>
    </div>
  );
};