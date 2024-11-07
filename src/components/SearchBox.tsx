'use client';
import { useState } from 'react';


interface SearchBoxProps {
  searchText: string;
  handleOnSubmit: (searchText: string) => void;
}


export default function SearchBox(props: SearchBoxProps) {
  const [searchText, setSearchText] = useState<string>(props.searchText);


  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    if (value === '') {
      props.handleOnSubmit('');
    };
  };


  const handleOnSubmit = () => {
    props.handleOnSubmit(searchText);
  };


  return (
    <div className='w-3/4 p-2 flex flex-row border border-slate-100 shadow-slate-200 shadow-md rounded-full'>
      <input
        className='pl-6 flex-grow bg-transparent outline-none'
        type='text'
        placeholder='Search Something...'
        value={searchText}
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