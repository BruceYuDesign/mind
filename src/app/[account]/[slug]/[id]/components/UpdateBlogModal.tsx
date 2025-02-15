'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});


interface UpdateBlogModalProps {
  id: string;
  content: string;
};


export default function UpdateBlogModal(props: UpdateBlogModalProps) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const { activeModal, setActiveModal } = useModal();


  const updateBlog = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    router.refresh();
    setActiveModal(null);
  }


  useEffect(() => {
    if (activeModal === 'update-blog') {
      setContent(props.content);
    }
  }, [activeModal]);


  return (
    <Modal
      id='update-blog'
      title='更新'
      size='lg'
    >
      <Editor
        content={content}
        onChange={setContent}
      />
      <button
        onClick={updateBlog}
        type='button'
      >
        Save
      </button>
    </Modal>
  )
}