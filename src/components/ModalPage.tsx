'use client';
import { useModalPage } from '@/context/ModalPageContext';


interface ModalPageProps {
  pages: Array<{
    id: string;
    title: string;
    children: React.ReactNode;
    actionsText?: string;
    actions?: () => void;
  }>;
}


export default function ModalPage(props: ModalPageProps) {
  const { currentPageId, setCurrentPageId } = useModalPage();


  const goBack = () => {
    const lastPageId = currentPageId?.split('_').slice(0, -1).join('_');
    setCurrentPageId(lastPageId || null);
  };


  return (
    <>
      {props.pages.map(page =>
        <div
          className='w-full h-full flex flex-col'
          style={{
            display: page.id === currentPageId ? 'block' : 'none',
            zIndex: page.id.split('_').length,
          }}
          key={page.id}
        >
          <div className='flex flex-row justify-between items-center'>
            <button
              onClick={goBack}
              type='button'
            >
              返回
            </button>
            <h3>
              {page.title}
            </h3>
            {
              page.actions ? (
                <button
                  onClick={page.actions}
                  type='button'
                >
                  {page.actionsText || '確定'}
                </button>
              ) : null
            }
          </div>
          {page.children}
        </div>
      )}
    </>
  );
};