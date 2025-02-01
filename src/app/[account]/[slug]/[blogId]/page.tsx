import 'server-only';
import Link from 'next/link';
import { ModalProvider } from '@/context/ModalContext';
import AutherTools from './components/AutherTools';
import ReaderTools from './components/ReaderTools';
import UpdateBlogModal from './components/UpdateBlogModal';
import DeleteBlogModal from './components/DeleteBlogModal';


interface BlogPageProps {
  params: {
    account: string;
    blogId: string;
  };
};


export default async function BlogPage(props: BlogPageProps) {


  const getBlog = async () => {
    // TODO: request
    await new Promise(resolve => setTimeout(resolve, 500));
    return `<h1>hello world. ID: ${props.params.blogId}</h1>`;
  }


  const content = await getBlog();


  const toolbarButtons = () => {
    // TODO: compare account
    const isAuther = props.params.account === 'bruce';
    if (isAuther) {
      return (
        <ModalProvider>
          <AutherTools/>
          <UpdateBlogModal
            blogId={props.params.blogId}
            content={content}
          />
          <DeleteBlogModal
            blogId={props.params.blogId}
          />
        </ModalProvider>
      )
    } else {
      return (
        <ReaderTools
          blogId={props.params.blogId}
          isCollected={false}
          isFollowed={false}
        />
      )
    }
  }


  return (
    <div>
      <ul className='flex flex-row gap-4'>
        {toolbarButtons()}
      </ul>
      <Link
        href={`/${props.params.account}`}
        scroll={false}
      >
        {props.params.account}
      </Link>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      >
      </div>
    </div>
  );
};