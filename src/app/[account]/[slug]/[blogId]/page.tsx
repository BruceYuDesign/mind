import 'server-only';
import { ModalProvider } from '@/context/ModalContext';
import AutherTools from './components/AutherTools';
import ReaderTools from './components/ReaderTools';
import UpdateBlogModal from './components/UpdateBlogModal';
import DeleteBlogModal from './components/DeleteBlogModal';


interface BlogLayoutProps {
  params: {
    blogId: string;
  };
};


export default async function BlogPage(props: BlogLayoutProps) {


  const getBlog = async () => {
    // TODO: request
    await new Promise(resolve => setTimeout(resolve, 500));
    return `<h1>hello world. ID: ${props.params.blogId}</h1>`;
  }


  const content = await getBlog();


  const toolbarButtons = () => {
    const isYourBlog = false;
    if (isYourBlog) {
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
          isLiked={false}
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
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      >
      </div>
    </div>
  );
};