'use client';
import { useModalPage } from '@/context/ModalPageContext';


interface ModalPageProps {
  id: string;
  title: string;
  children: React.ReactNode;
  actionsText?: string;
  actions?: () => void;
}


export default function ModalPage(props: ModalPageProps) {
  const { currentPageId, setCurrentPageId } = useModalPage();


  const goBack = () => {
    const lastPageId = currentPageId?.split('_').slice(0, -1).join('_');
    setCurrentPageId(lastPageId || null);
  };


  return (
    <div
      className='bg-inherit absolute top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col'
      style={{
        display: props.id === currentPageId ? 'block' : 'none',
        zIndex: props.id.split('_').length,
      }}
    >
      <div className='flex flex-row justify-between items-center'>
        <button
          onClick={goBack}
          type='button'
        >
          返回
        </button>
        <h3>
          {props.title}
        </h3>
        {
          props.actions && (
            <button
              onClick={props.actions}
              type='button'
            >
              {props.actionsText || '確定'}
            </button>
          )
        }
      </div>
      {props.children}
    </div>
  );
};