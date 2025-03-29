'use client';
import { useModal } from '@/context/ModalContext';


export default function AutherTools() {
  const { setActiveModal } = useModal();


  const openUpdateUserModal = () => {
    setActiveModal('update-user');
  };


  const openCreateBlogModal = () => {
    setActiveModal('create-blog');
  };


  const openLogOutModal = () => {
    setActiveModal('log-out');
  };


  return (
    <>
      <button
        type='button'
        onClick={openUpdateUserModal}
      >
        修改資料
      </button>
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
  );
};