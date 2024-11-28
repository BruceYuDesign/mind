'use client';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';


interface DeleteBlogModalProps {
  blogId: string;
};


export default function DeleteBlogModal(props: DeleteBlogModalProps) {


  const { setActiveModal } = useModal();


  const closeModal = () => {
    setActiveModal(null);
  }


  const handleBlogOnDelete = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(props.blogId);
    closeModal();
  }


  return (
    <Modal
      id='delete-blog-modal'
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