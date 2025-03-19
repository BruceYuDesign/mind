'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect, useRef } from 'react';
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


  const getBlogs = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const data = await fetchHandler({
      url: '/api/blog',
      queryParams: {
        page: page.current,
        ...props.queryParams,
      }
    });

    page.current === 1
      ? setBlogs(data.items)
      : setBlogs([...blogs, ...data.items]);
    totalPages.current = data.pagenation.totalPages;
    isLoading.current = false;
  };


  const scrollToNextPage = () => {
    if (!nextPageRef.current || isLoading.current) return;
    const nextPageTop = nextPageRef.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (nextPageTop < windowHeight && page.current < totalPages.current) {
      page.current += 1;
      getBlogs();
    }
  };


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
      {/* 部落格清單 */}
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
      {/* 下一頁觸發器 */}
      <div ref={nextPageRef}></div>
    </>
  );
};