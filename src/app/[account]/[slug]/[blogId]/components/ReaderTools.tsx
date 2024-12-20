'use client';
import { useState } from 'react';


interface ReaderToolsProps {
  blogId: string;
  isCollected: boolean;
  isFollowed: boolean;
}


export default function ReaderTools(props: ReaderToolsProps) {
  const [isCollected, setIsCollected] = useState(props.isCollected);
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);


  const updateCollected = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsCollected(!isCollected);
  }


  const updateFollowed = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFollowed(!isFollowed);
  }


  return (
    <>
      <button
        type='button'
        onClick={updateCollected}
      >
        {isCollected ? '已收藏' : '收藏'}
      </button>
      <button
        type='button'
        onClick={updateFollowed}
      >
        {isFollowed ? '已追蹤' : '追蹤'}
      </button>
    </>
  )
}