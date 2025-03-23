'use client';
import { signOut } from 'next-auth/react';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';


export default function LogOutModal() {
  const { setActiveModal } = useModal();


  const closeModal = () => {
    setActiveModal(null);
  };


  const logOut = async () => {
    signOut({ callbackUrl: '/' });
  };


  return (
    <Modal
      id='log-out'
      title='確認登出'
      size='md'
    >
      <button
        type='button'
        onClick={closeModal}
      >
        取消
      </button>
      <button
        type='button'
        onClick={logOut}
      >
        登出
      </button>
    </Modal>
  );
};