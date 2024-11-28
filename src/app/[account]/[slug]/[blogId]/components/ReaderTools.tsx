'use client';
import { useState } from 'react';


interface ReaderToolsProps {
  blogId: string;
  isCollected: boolean;
  isLiked: boolean;
  isFollowed: boolean;
}


export default function ReaderTools(props: ReaderToolsProps) {


  const [isCollected, setIsCollected] = useState(props.isCollected);
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);


  const toggleCollected = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsCollected(!isCollected);
  }


  const toggleLiked = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLiked(!isLiked);
  }


  const toggleFollowed = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFollowed(!isFollowed);
  }


  return (
    <>
      <button
        type='button'
        onClick={toggleCollected}
      >
        {isCollected ? '已收藏' : '收藏'}
      </button>
      <button
        type='button'
        onClick={toggleLiked}
      >
        {isLiked ? '已按讚' : '按讚'}
      </button>
      <button
        type='button'
        onClick={toggleFollowed}
      >
        {isFollowed ? '已追蹤' : '追蹤'}
      </button>
    </>
  )
}