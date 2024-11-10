'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
import BlogCard from '@/components/BlogCard';
import blogData from '@/mocks/blog.json';


export default function Journal() {
  const searchText = useSearchParams().get('search') || '';
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);


  const handleOnSubmit = async (text: string) => {
    // TODO: request
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const filteredBlogs = blogData.filter(blog => (
        blog.title.toLowerCase().includes(text.toLowerCase()) ||
        blog.desc.toLowerCase().includes(text.toLowerCase())
      ));
      setBlogs(filteredBlogs);
    } catch {
      console.error('Failed to request');
    }
  };


  useEffect(() => {
    handleOnSubmit(searchText);
  }, [searchText]);


  return (
    <div className='util-container flex flex-col items-center gap-8 pt-8'>
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