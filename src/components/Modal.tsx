'use client';
import { useModal } from '@/context/ModalContext';


type ModalSize = 'md' | 'lg';


interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  size?: ModalSize;
  pages?: Array<React.ReactNode>;
}


export default function Modal(props: ModalProps) {
  const modalWidth = {
    md: '640px',
    lg: '1024px',
  }
  const { activeModal, setActiveModal } = useModal();


  const closeModal = () => {
    setActiveModal(null);
  }


  return (
    <div
      className={
        `${ activeModal === props.id ? 'block' : 'hidden'}` +
        ' fixed top-0 left-0 right-0 bottom-0 h-screen w-screen py-16 flex justify-center items-start bg-black/50 z-50 overflow-auto'
      }
    >
      <div
        className='relative w-11/12 my-auto flex flex-col items-stretch justify-start p-4 bg-white'
        style={{
          maxWidth: modalWidth[props.size || 'md'],
        }}
      >
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-3xl font-bold'>
            {props.title}
          </h2>
          <button
            type='button'
            onClick={closeModal}
            >
            Ｘ
          </button>
        </div>
        {props.pages}
        {props.children}
      </div>
    </div>
  );
};