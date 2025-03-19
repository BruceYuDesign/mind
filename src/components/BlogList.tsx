'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchHandler } from '@/utils/fetch-handler';
import BlogCard from '@/components/BlogCard';


interface BlogListProps {
  queryParams: Record<string, unknown>;
};


export default function BlogList(props: BlogListProps) {
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);
  
  const nextPageRef = useRef<HTMLDivElement>(null);
  const page = useRef<number>(1);
  const totalPages = useRef<number>(0);
  const isLoading = useRef<boolean>(false);


  const getBlogs = useCallback(async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const data = await fetchHandler({
      url: '/api/blog',
      queryParams: {
        page: page.current,
        ...props.queryParams,
      }
    });

    setBlogs(prevBlogs => page.current === 1
      ? data.items
      : [...prevBlogs, ...data.items]
    );
    totalPages.current = data.pagenation.totalPages;
    isLoading.current = false;
  }, [props.queryParams, page, totalPages]);


  const scrollToNextPage = useCallback(() => {
    if (!nextPageRef.current || isLoading.current) return;
    const nextPageTop = nextPageRef.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (nextPageTop < windowHeight && page.current < totalPages.current) {
      page.current += 1;
      getBlogs();
    }
  }, [props.queryParams]);


  useEffect(() => {
    page.current = 1;
    getBlogs();
  }, [props.queryParams]);


  useEffect(() => {
    window.addEventListener('scroll', scrollToNextPage);
    return () => {
      window.removeEventListener('scroll', scrollToNextPage);
    };
  }, [scrollToNextPage]);


  return (
    <>
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
      <div ref={nextPageRef}></div>
    </>
  );
};