'use client';
import { useModal } from '@/context/ModalContext';


type ModalSize = 'md' | 'lg';


interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  size?: ModalSize;
}


export default function Modal(props: ModalProps) {
  const modalWidth = {
    md: '640px',
    lg: '1024px',
  }
  const { activeModal, setActiveModal } = useModal();


  const handleClose = () => {
    setActiveModal(null);
  }


  return (
    <div
      className={
        `${ activeModal === props.id ? 'block' : 'hidden'}` +
        ' fixed top-0 left-0 right-0 bottom-0 h-screen w-screen flex justify-center items-center bg-black/50 z-50'
      }
    >
      <div
        className='w-11/12 flex flex-col items-stretch justify-start p-4 bg-white'
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
            onClick={handleClose}
            >
            Ｘ
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}