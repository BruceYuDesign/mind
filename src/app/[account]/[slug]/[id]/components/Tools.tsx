'use client';
import type { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import { ModalProvider } from '@/context/ModalContext';
import AutherTools from './AutherTools';
import ReaderTools from './ReaderTools';
import UpdateBlogModal from './UpdateBlogModal';
import DeleteBlogModal from './DeleteBlogModal';


// TODO 模組化型別
interface ExtendedSession extends Session {
  expires: string;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    account: string;
  };
};


interface ToolsProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  account: string;
};


function ToolsContent(props: ToolsProps) {
  const { data: session } = useSession();


  const isAuther = props.account === (session as ExtendedSession)?.user?.account;

  return (
    <ul className='flex flex-row gap-4'>
      {
        isAuther ? (
          <ModalProvider>
            <AutherTools/>
            <UpdateBlogModal
              id={props.id}
              title={props.title}
              description={props.description}
              thumbnail={props.thumbnail}
              content={props.content}
            />
            <DeleteBlogModal
              id={props.id}
            />
          </ModalProvider>
        ) : (
          <ReaderTools
            id={props.id}
            isCollected={false}
            isFollowed={false}
          />
        )
      }
    </ul>
  )
};


export default function Tools(props: ToolsProps) {
  return (
    <SessionProvider>
      <ModalProvider>
        <ToolsContent
          {...props}
        />
      </ModalProvider>
    </SessionProvider>
  );
};