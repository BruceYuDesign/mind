'use client';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import { fetchHandler } from '@/utils/fetch-handler';
import Modal from '@/components/Modal';


interface DeleteBlogModalProps {
  id: string;
};


export default function DeleteBlogModal(props: DeleteBlogModalProps) {
  const router = useRouter();
  const { setActiveModal } = useModal();


  const closeModal = () => {
    setActiveModal(null);
  }


  const deleteBlog = async () => {
    await fetchHandler({
      url: '/api/blog',
      pathParams: [props.id],
      method: 'DELETE',
    });
    router.push('../', { scroll: false });
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
        onClick={deleteBlog}
      >
        刪除
      </button>
    </Modal>
  )
}