'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
import BlogCard from '@/components/BlogCard';
import blogData from '@/mocks/blog.json';


export default function Journal() {
  const searchText = useSearchParams().get('search') || '';
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);


  // TODO: request
  const getBlogs = async (text: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return blogData.filter(blog => (
      blog.title.toLowerCase().includes(text.toLowerCase()) ||
      blog.desc.toLowerCase().includes(text.toLowerCase())
    ));
  }


  const handleOnSubmit = useCallback(async (text: string) => {
    const blogData = await getBlogs(text);
    setBlogs(blogData);
  }, []);


  // TODO: 研究 useEffect 的用法
  useEffect(() => {
    handleOnSubmit(searchText);
  }, [searchText, handleOnSubmit]);


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