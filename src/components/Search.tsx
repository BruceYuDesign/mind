'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
import BlogCard from '@/components/BlogCard';
import blogData from '@/mocks/blog.json';


export default function Search() {
  const searchText = useSearchParams().get('search') || '';


  // TODO: request
  const getBlogs = async (text: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return blogData.filter(blog => (
      blog.title.toLowerCase().includes(text.toLowerCase()) ||
      blog.desc.toLowerCase().includes(text.toLowerCase())
    ));
  }
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);


  const handleOnSubmit = useCallback(async (text: string) => {
    const blogData = await getBlogs(text);
    setBlogs(blogData);
    history.pushState(null, '', text ? `?search=${text}` : '/');
  }, []);


  // TODO: 研究 useEffect 的用法
  useEffect(() => {
    handleOnSubmit(searchText);
  }, [searchText, handleOnSubmit]);


  return (
    <>
      <SearchBox
        searchText={searchText}
        handleOnSubmit={handleOnSubmit}
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
    </>
  );
};