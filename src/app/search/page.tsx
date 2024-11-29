'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
import BlogCard from '@/components/BlogCard';
import blogData from '@/mocks/blog.json';


function SearchPageContent() {
  const searchText = useSearchParams().get('text') || '';
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);


  const getBlogs = async (text: string) => {
    // TODO: request
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const filteredBlogs = blogData.filter(blog => (
        blog.title.toLowerCase().includes(text.toLowerCase()) ||
        blog.description.toLowerCase().includes(text.toLowerCase())
      ));
      setBlogs(filteredBlogs);
    } catch {
      console.error('Failed to request');
    }
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
              key={blog.blog_id}
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
}