'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';


interface AutherToolsProps {
  account: string
}


export default function AutherTools(props: AutherToolsProps) {
  const router = useRouter();
  const { setActiveModal } = useModal();


  const openCreateBlogModal = () => {
    setActiveModal('create-blog');
  }


  const openLogOutModal = () => {
    setActiveModal('log-out');
  }


  return (
    <>
      <Link
        href={`/${props.account}/config`}
      >
        修改資料
      </Link>
      <button
        type='button'
        onClick={openCreateBlogModal}
      >
        建立
      </button>
      <button
        type='button'
        onClick={openLogOutModal}
      >
        登出
      </button>
    </>
  )
}