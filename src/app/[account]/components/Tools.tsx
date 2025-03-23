'use client';
import type { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import { ModalProvider } from '@/context/ModalContext';
import AutherTools from './AutherTools';
import ReaderTools from './ReaderTools';
import LogOutModal from './LogOutModal';
import CreateBlogModal from '@/components/CreateBlogModal';


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
            <AutherTools
              account={props.account}
            />
            <CreateBlogModal/>
            <LogOutModal/>
          </ModalProvider>
        ) : (
          <ReaderTools
            account={props.account}
            isFollowed={false}
          />
        )
      }
    </ul>
  );
};


export default function Tools(props: ToolsProps) {
  return (
    <SessionProvider>
      <ToolsContent
        {...props}
      />
    </SessionProvider>
  );
};