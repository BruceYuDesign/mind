'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});


export default function CreateBlogModal() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const { activeModal, setActiveModal } = useModal();


  const createBlog = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    router.refresh();
    setActiveModal(null);
  }


  useEffect(() => {
    if (activeModal === 'create-blog') {
      setContent('');
    }
  }, [activeModal]);


  return (
    <Modal
      id='create-blog'
      title='建立'
      size='lg'
    >
      <Editor
        content={content}
        onChange={setContent}
      />
      <button
        onClick={createBlog}
        type='button'
      >
        Save
      </button>
    </Modal>
  )
}