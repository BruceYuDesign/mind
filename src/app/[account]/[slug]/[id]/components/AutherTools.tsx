'use client';
import { useModal } from '@/context/ModalContext';


export default function AutherTools() {
  const { setActiveModal } = useModal();


  const openUpdateBlogModal = () => {
    setActiveModal('update-blog');
  }


  const openDeleteBlogModal = () => {
    setActiveModal('delete-blog');
  }


  return (
    <>
      <button
        type='button'
        onClick={openUpdateBlogModal}
      >
        修改
      </button>
      <button
        type='button'
        onClick={openDeleteBlogModal}
      >
        删除
      </button>
    </>
  )
}