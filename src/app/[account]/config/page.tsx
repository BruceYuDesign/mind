'use client';
import { useState, useEffect } from 'react';
import { ModalProvider, useModal } from '@/context/ModalContext';
import UpdateAvatarModal from './components/UpdateAvatarModal';
import UpdateIntroModal from './components/UpdateIntroModal';


interface ConfigPageProps {
  params: {
    account: string;
  };
};


function ConfigPageContent(props: ConfigPageProps) {
  const { setActiveModal } = useModal();
  const [intro, setIntro] = useState('');
  const [avatar, setAvatar] = useState('');


  const openEditAvatarModal = () => {
    setActiveModal('update-avatar');
  }


  const openUpdateIntroModal = () => {
    setActiveModal('update-intro');
  }


  useEffect(() => {
    const getProfile = async () => {
      // TODO: request
      await new Promise(resolve => setTimeout(resolve, 500));
      setIntro('hello world');
      setAvatar('https://via.placeholder.com/150');
    }
    getProfile();
  }, []);


  return (
    <>
      <div
        onClick={openEditAvatarModal}
      >
        <img
          src={avatar}
          alt='avatar'
          width={150}
          height={150}
        />
      </div>
      <p
        onClick={openUpdateIntroModal}
      >
        {intro}
      </p>
      <UpdateAvatarModal
        avatar={avatar}
      />
      <UpdateIntroModal
        intro={intro}
      />
    </>
  );
};


export default function ConfigPage(props: ConfigPageProps) {
  return (
    <ModalProvider>
      <ConfigPageContent
        {...props}
      />
    </ModalProvider>
  );
}