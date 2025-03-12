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
  const [page, setPage] = useState<number>(1);
  
  const nextPageRef = useRef<HTMLDivElement>(null);
  const totalPages = useRef(0);
  const isLoading = useRef(false);


  // 取得部落格
  const getBlogs = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const data = await fetchHandler({
      url: '/api/blog',
      queryParams: {
        page,
        ...props.queryParams,
      }
    });

    setBlogs(prev => [...prev, ...data.items]);
    totalPages.current = data.pagenation.totalPages;
    isLoading.current = false;
  };


  // 滾動觸發下一頁
  const scrollToNextPage = useCallback(() => {
    if (!nextPageRef.current) return;
    const nextPageTop = nextPageRef.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (nextPageTop < windowHeight && page < totalPages.current) {
      setPage(prev => prev + 1);
    }
  }, [page]);


  useEffect(() => {
    setBlogs([]);
    setPage(1);
    if (page === 1) {
      getBlogs();
    }
  }, [props.queryParams]);


  useEffect(() => {
    getBlogs();
  }, [page]);


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