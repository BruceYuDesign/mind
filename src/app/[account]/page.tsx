'use client';
import type { BlogCardProps } from '@/components/BlogCard';
import { useState, useEffect, Suspense } from 'react';
import BlogCard from '@/components/BlogCard';
import blogData from '@/mocks/blog-account.json';


export default function AccountPage() {
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);


  const toolbarButtons = () => {
    const isYourBlog = true;
    if (isYourBlog) {
      return (
        <></>
      )
    } else {
      return (
        <></>
      )
    }
  }


  const getBlogs = async () => {
    // TODO: request
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      setBlogs(blogData);
    } catch {
      console.error('Failed to request');
    }
  };


  useEffect(() => {
    getBlogs();
  });


  return (
    <div>
      <div className='flex flex-row gap-8'>
        <div className='w-40 h-40 rounded-full bg-slate-200'></div>
        <div>
          <h1 className='text-4xl font-bold'>
            Your Account
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
              key={blog.blog_id}
              {...blog}
            />
          )
        }
      </div>
    </div>
  );
}