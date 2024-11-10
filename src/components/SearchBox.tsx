'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface SearchBoxProps {
  defaultValue?: string;
}


export default function SearchBox(props: SearchBoxProps) {
  const router = useRouter();
  const [text, setText] = useState(props.defaultValue || '');


  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }


  const handleOnSubmit = () => {
    const href = `/journal${text ? `?search=${text}` : ''}`;
    router.push(href);
  };


  return (
    <div className='w-3/4 p-2 flex flex-row border border-slate-100 shadow-slate-200 shadow-md rounded-full'>
      <input
        className='pl-6 flex-grow bg-transparent outline-none'
        type='text'
        placeholder='Search Something...'
        value={text}
        onChange={handleOnChange}
      />
      <button
        className='bg-primary text-white font-bold text-foreground px-6 py-2 rounded-full'
        type='button'
        onClick={handleOnSubmit}
      >
        搜尋
      </button>
    </div>
  );
};