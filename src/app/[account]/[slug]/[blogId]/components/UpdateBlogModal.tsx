'use client';
import dynamic from 'next/dynamic';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});


interface UpdateBlogModalProps {
  blogId: string;
  content: string;
};


export default function UpdateBlogModal(props: UpdateBlogModalProps) {


  const { setActiveModal } = useModal();


  const handleBlogOnUpdate = async (content: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(content);
    setActiveModal(null);
  }


  return (
    <Modal
      id='update-blog-modal'
      title='更新'
      size='lg'
    >
      <Editor
        initialContent={props.content}
        editorOnSave={handleBlogOnUpdate}
      />
    </Modal>
  )
}