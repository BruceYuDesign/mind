'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [page, setPage] = useState<number>(1);
  
  const ref = useRef<HTMLDivElement>(null);
  const totalPages = useRef(0);
  const isLoading = useRef(false);


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


  useEffect(() => {
    getUser();
    getBlogs();
  }, []);


  const getBlogs = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const data = await fetchHandler({
      url: '/api/blog',
      queryParams: {
        author: props.params.account,
        page,
      },
    });

    setBlogs(prev => [...prev, ...data.items]);
    totalPages.current = data.pagenation.totalPages;
    isLoading.current = false;
  };


  const windowOnScroll = useCallback(() => {
    if (!ref.current) return;
    const nextPageTop = ref.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (nextPageTop < windowHeight && page < totalPages.current) {
      setPage(prev => prev + 1);
    }
  }, [page]);


  useEffect(() => {
    getBlogs();
  }, [page]);


  useEffect(() => {
    window.addEventListener('scroll', windowOnScroll);
    return () => {
      window.removeEventListener('scroll', windowOnScroll);
    };
  }, [windowOnScroll]);


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
      <div ref={ref}></div>
    </div>
  );
}