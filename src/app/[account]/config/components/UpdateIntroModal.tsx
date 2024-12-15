'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext';
import Modal from '@/components/Modal';


interface UpdateIntroModal {
  intro: string;
};


export default function UpdateIntroModal(props: UpdateIntroModal) {
  const router = useRouter();
  const { activeModal, setActiveModal } = useModal();
  const [intro, setIntro] = useState('');


  const changeIntro = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntro(event.target.value);
  }


  const closeModal = () => {
    setActiveModal(null);
  }


  const handleIntroOnUpdate = async () => {
    if (intro !== props.intro) {
      await new Promise(resolve => setTimeout(resolve, 500));
      router.refresh();
    }
    closeModal();
  }


  useEffect(() => {
    if (activeModal === 'update-intro') {
      setIntro(props.intro);
    }
  }, [props.intro ,activeModal]);


  return (
    <Modal
      id='update-intro'
      title='更新'
      size='md'
    >
      <textarea
        value={intro}
        onChange={changeIntro}
      />
      <button
        type='button'
        onClick={closeModal}
      >
        取消
      </button>
      <button
        type='button'
        onClick={handleIntroOnUpdate}
      >
        確定
      </button>
    </Modal>
  )
}