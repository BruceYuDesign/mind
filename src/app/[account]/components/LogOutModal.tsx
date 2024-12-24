'use client';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';


export default function LogOutModal() {
  const router = useRouter();
  const { setActiveModal } = useModal();


  const closeModal = () => {
    setActiveModal(null);
  }


  const logOut = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/');
  }


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
  )
}