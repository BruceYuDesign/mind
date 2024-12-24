'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect } from 'react';
import { ModalProvider } from '@/context/ModalContext';
import BlogCard from '@/components/BlogCard';
import CreateBlogModal from '@/components/CreateBlogModal';
import AutherTools from './components/AutherTools';
import ReaderTools from './components/ReaderTools';
import LogOutModal from './components/LogOutModal';
import blogData from '@/mocks/blog.json';


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


  const getBlogs = async () => {
    // TODO: request
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const autherBlog = blogData.filter(({ account }) => account === props.params.account);
      setBlogs(autherBlog);
    } catch {
      console.error('Failed to request');
    }
  };


  useEffect(() => {
    getBlogs();
  });


  return (
    <div>
      <div className='flex flex-row gap-8'>
        <div className='w-40 h-40 rounded-full bg-slate-200'></div>
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
              key={blog.blog_id}
              {...blog}
            />
          )
        }
      </div>
    </div>
  );
}