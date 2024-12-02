'use client';
import { useState } from 'react';


interface ReaderToolsProps {
  account: string;
  isFollowed: boolean;
}


export default function ReaderTools(props: ReaderToolsProps) {
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);


  const toggleFollowed = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFollowed(!isFollowed);
  }


  return (
    <>
      <button
        type='button'
        onClick={toggleFollowed}
      >
        {isFollowed ? '已追蹤' : '追蹤'}
      </button>
    </>
  )
}