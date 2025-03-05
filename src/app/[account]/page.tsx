'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect } from 'react';
import { fetchHandler } from '@/utils/fetch-handler';
import { ModalProvider } from '@/context/ModalContext';
import BlogCard from '@/components/BlogCard';
import CreateBlogModal from '@/components/CreateBlogModal';
import AutherTools from './components/AutherTools';
import ReaderTools from './components/ReaderTools';
import LogOutModal from './components/LogOutModal';


interface AccountPageProps {
  params: {
    account: string;
  };
};


export default function AccountPage(props: AccountPageProps) {
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);


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
    }
  }


  const getUser = async () => {
    // TODO Get User Data
  }


  const getBlogs = async () => {
    const data = await fetchHandler({
      url: '/api/blog',
      queryParams: {
        author: props.params.account,
      },
    });
    setBlogs(data.items);
  };


  useEffect(() => {
    getUser();
    getBlogs();
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
        {toolbarButtons()}
      </ul>
      <div className='w-full grid grid-cols-3 gap-8'>
        {
          blogs.map(blog =>
            <BlogCard
              key={blog.id}
              {...blog}
            />
          )
        }
      </div>
    </div>
  );
}