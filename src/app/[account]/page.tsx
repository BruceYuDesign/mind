'use client';
import { useEffect } from 'react';
import { ModalProvider } from '@/context/ModalContext';
import { SessionProvider, signIn,
  // signOut, useSession
} from 'next-auth/react';
import BlogList from '@/components/BlogList';
import CreateBlogModal from '@/components/CreateBlogModal';
import AutherTools from './components/AutherTools';
import ReaderTools from './components/ReaderTools';
import LogOutModal from './components/LogOutModal';


interface AccountPageProps {
  params: {
    account: string;
  };
};


function AccountPageContent(props: AccountPageProps) {


  const toolbarButtons = () => {
    // TODO: compare account
    const isAuther = props.params.account === 'bruce';
    if (isAuther) {
      return (
        <ModalProvider>
          <AutherTools
            account={props.params.account}
          />
          <CreateBlogModal/>
          <LogOutModal/>
        </ModalProvider>
      )
    } else {
      return (
        <ReaderTools
          account={props.params.account}
          isFollowed={false}
        /> 
      )
    };
  };


  const getUser = async () => {
    // TODO Get User Data
  };


  useEffect(() => {
    getUser();
  }, []);


  return (
    <div
      className='util-container
      flex flex-col gap-4'
    >
      <div className='flex flex-row gap-8'>
        <div className='w-40 h-40 rounded-full bg-secondary-200'></div>
        <div>
          <h1 className='text-4xl font-bold'>
            {props.params.account}
          </h1>
          <p>
            Your Account Description
          </p>
        </div>
      </div>
      <ul className='flex flex-row gap-4'>
        {/* TODO: Just Test */}
        <button
          type='button'
          onClick={() => signIn()}
        >
          登入
        </button>
        {toolbarButtons()}
      </ul>
      <BlogList
        queryParams={{
          auther: props.params.account,
        }}
      />
    </div>
  );
};


export default function AccountPage(props: AccountPageProps) {
  return (
    <SessionProvider>
      <AccountPageContent
        {...props}
      />
    </SessionProvider>
  );
};