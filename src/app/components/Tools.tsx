'use client';
import { useModal } from '@/context/ModalContext';


export default function Tools() {
  const { setActiveModal } = useModal();


  const openCreateBlogModal = () => {
    setActiveModal('create-blog');
  }


  return (
    <>
      <button
        className='util-btn-primary'
        type='button'
        onClick={openCreateBlogModal}
      >
        建立你的想法
      </button>
    </>
  )
}