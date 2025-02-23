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
  const { activeModal } = useModal();


  const createBlog = async () => {
    const authorId = 'bruce';
    const slug = 'test-blog'
    const title = 'Test Blog';
    const description = 'This is a test blog';
    const content = '<p>This is a test blog</p><br><p>It is a test blog</p>';
    const thumbnail = 'https://my-images/test-blog.jpg';

    const { id: blogId } = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorId,
        slug,
        title,
        description,
        content,
        thumbnail,
      }),
    }).then(response => response.json());

    router.push(`/${authorId}/${slug}/${blogId}`);
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
        defaultValue={content}
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