'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchHandler } from '@/utils/fetch-handler';
import SearchBox from '@/components/SearchBox';
import BlogCard from '@/components/BlogCard';


function SearchPageContent() {
  const searchText = useSearchParams().get('text') || '';
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);


  const getBlogs = async (text: string) => {
    const data = await fetchHandler({
      url: '/api/blog',
      queryParams: { text },
    });
    setBlogs(data.items);
  };


  useEffect(() => {
    getBlogs(searchText);
  }, [searchText]);


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