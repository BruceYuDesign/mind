'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import { fetchHandler } from '@/utils/fetchHandler';
import Modal from '@/components/Modal';
import Field from '@/components/Field';
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});


export default function CreateBlogModal() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const { activeModal } = useModal();


  const createBlog = async () => {
    const { author_id, slug, id } = await fetchHandler({
      url: '/api/blog',
      method: 'POST',
      body: {
        title,
        description,
        thumbnail,
        content,
      },
    });

    router.push(`/${author_id}/${slug}/${id}`);
  }


  useEffect(() => {
    if (activeModal === 'create-blog') {
      setTitle('');
      setDescription('');
      setThumbnail('');
      setContent('');
    }
  }, [activeModal]);


  return (
    <Modal
      id='create-blog'
      title='建立'
      size='lg'
    >
      <div className='flex flex-col gap-4'>
        <Field
          type='text'
          label='標題'
          defaultValue={title}
          onInput={setTitle}
        />
        <Field
          type='textarea'
          label='描述'
          defaultValue={description}
          onInput={setDescription}
        />
        <Field
          type='image'
          label='縮圖'
          aspectRatio='1200/630'
          defaultValue={thumbnail}
          onChange={setThumbnail}
        />
        <Editor
          defaultValue={content}
          onChange={setContent}
        />
      </div>
      <button
        onClick={createBlog}
        type='button'
      >
        Save
      </button>
    </Modal>
  )
}