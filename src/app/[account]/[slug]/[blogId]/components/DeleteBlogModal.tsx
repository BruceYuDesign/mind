'use client';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';


interface DeleteBlogModalProps {
  blogId: string;
};


export default function DeleteBlogModal(props: DeleteBlogModalProps) {
  const router = useRouter();
  const { setActiveModal } = useModal();


  const closeModal = () => {
    setActiveModal(null);
  }


  const handleBlogOnDelete = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(props.blogId);
    router.push('../');
  }


  return (
    <Modal
      id='delete-blog'
      title='確認刪除'
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
        onClick={handleBlogOnDelete}
      >
        刪除
      </button>
    </Modal>
  )
}