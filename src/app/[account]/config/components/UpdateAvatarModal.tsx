'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';


interface UpdateAvatarModalProps {
  avatar: string;
};


export default function UpdateAvatarModal(props: UpdateAvatarModalProps) {
  const router = useRouter();
  const { activeModal, setActiveModal } = useModal();
  const [avatar, setAvatar] = useState('');


  const removeAvatar = () => {
    setAvatar('');
  }


  const uploadAvatar = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          setAvatar(reader.result as string);
        }
        reader.readAsDataURL(file);
      }
    }
    input.click();
  }


  const closeModal = () => {
    setActiveModal(null);
  }


  const handleAvatarOnUpdate = async () => {
    if (avatar !== props.avatar) {
      await new Promise(resolve => setTimeout(resolve, 500));
      router.refresh();
    }
    closeModal();
  }


  useEffect(() => {
    if (activeModal === 'update-avatar') {
      setAvatar(props.avatar);
    }
  }, [props.avatar ,activeModal]);


  return (
    <Modal
      id='update-avatar'
      title='編輯大頭貼'
      size='md'
    >
      <img
        src={avatar}
        alt='avatar'
        width='150'
        height='150'
      />
      <button
        type='button'
        onClick={removeAvatar}
      >
        移除頭貼
      </button>
      <button
        type='button'
        onClick={uploadAvatar}
      >
        上傳頭貼
      </button>
      <button
        type='button'
        onClick={closeModal}
      >
        取消
      </button>
      <button
        type='button'
        onClick={handleAvatarOnUpdate}
      >
        確定
      </button>
    </Modal>
  )
}