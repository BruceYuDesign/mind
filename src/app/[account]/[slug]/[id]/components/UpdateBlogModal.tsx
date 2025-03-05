'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blogValidator } from '@/utils/data-validator';
import { useModal } from '@/context/ModalContext';
import { fetchHandler } from '@/utils/fetch-handler';
import Modal from '@/components/Modal';
import Field from '@/components/Field';
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});


interface UpdateBlogModalProps {
  id: string;
  title: string; 
  description: string;
  thumbnail: string;
  content: string;
};


export default function UpdateBlogModal(props: UpdateBlogModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [thumbnail, setThumbnail] = useState(props.thumbnail);
  const [content, setContent] = useState(props.content);
  const { activeModal, setActiveModal } = useModal();


  const updateBlog = async () => {
    const errors = blogValidator({
      title,
      description,
      thumbnail,
      content,
    }).getErrors();

    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    await fetchHandler({
      url: '/api/blog',
      pathParams: [props.id],
      method: 'PUT',
      body: {
        title,
        description,
        thumbnail,
        content,
      },
    });

    router.refresh();
    setActiveModal(null);
  }


  useEffect(() => {
    if (activeModal === 'update-blog') {
      setTitle(props.title);
      setDescription(props.description);
      setThumbnail(props.thumbnail);
      setContent(props.content);
    }
  }, [activeModal]);


  return (
    <Modal
      id='update-blog'
      title='更新'
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
        onClick={updateBlog}
        type='button'
      >
        Save
      </button>
    </Modal>
  )
}