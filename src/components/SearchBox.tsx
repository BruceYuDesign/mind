'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface SearchBoxProps {
  defaultValue?: string;
}


export default function SearchBox(props: SearchBoxProps) {
  const router = useRouter();
  const [text, setText] = useState(props.defaultValue || '');


  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };


  const searchBlogs = () => {
    const href = `/search${text ? `?text=${text.trim()}` : ''}`;
    router.push(href, { scroll: false });
  };


  return (
    <div
      className='util-border
      w-3/4 p-2 flex flex-row rounded-full'
    >
      <input
        className='pl-6 flex-grow bg-transparent outline-none'
        type='text'
        placeholder='Search Something...'
        value={text}
        onChange={changeText}
      />
      <button
        className='util-btn-primary'
        type='button'
        onClick={searchBlogs}
      >
        搜尋
      </button>
    </div>
  );
};