'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchHandler } from '@/utils/fetch-handler';
import SearchBox from '@/components/SearchBox';
import BlogCard from '@/components/BlogCard';


function SearchPageContent() {
  const searchText = useSearchParams().get('text') || '';

  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);
  const [page, setPage] = useState<number>(1);

  const ref = useRef<HTMLDivElement>(null);
  const totalPages = useRef(0);
  const isFetching = useRef(false);


  const getBlogs = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    const data = await fetchHandler({
      url: '/api/blog',
      queryParams: {
        text: searchText,
        page,
      },
    });

    setBlogs(prev => [...prev, ...data.items]);
    totalPages.current = data.pagenation.totalPages;
    isFetching.current = false;
  };


  const windowOnScroll = () => {
    if (!ref.current) return;
    const nextPageTop = ref.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (nextPageTop < windowHeight && page < totalPages.current) {
      setPage(prev => prev + 1);
    }
  };


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
      flex flex-col items-center gap-8 pt-8'
    >
      <SearchBox
        defaultValue={searchText}
      />
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
};


export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent/>
    </Suspense>
  );
};