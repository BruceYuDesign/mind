'use client';
import { ModalPageProvider, useModalPage } from '@/context/ModalPageContext';
import Modal from '@/components/Modal';
import ModalPage from '@/components/ModalPage';


interface UpdateUserModalProps {
  account: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
};


function UpdateNamePage(props: {name: string}) {
  return (
    <ModalPage
      id='update_name'
      title='修改名稱'
      actionsText='修改'
      actions={ () => {
        alert('修改名稱');
      }}
    >
      <input
        type='text'
        value={props.name}
      />
    </ModalPage>
  );
};


function UpdateUserModalContent(props: UpdateUserModalProps) {
  const { setCurrentPageId } = useModalPage();


  return (
    <Modal
      id='update-user'
      title='修改個人資料'
      size='md'
      pages={[
        <UpdateNamePage key='update_name' name={props.name} />,
      ]}
    >
      <div
        className='w-40 h-40 rounded-full bg-secondary-200 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${props.avatar})` || 'none',
        }}
      />
      <p>
        {props.account}
      </p>
      <p
        onClick={() => setCurrentPageId('update_name')}
      >
        {props.name}
      </p>
      <p>
        {props.email}
      </p>
      <button
        type='button'
      >
        修改密碼
      </button>
    </Modal>
  );
};


export default function UpdateUserModal(props: UpdateUserModalProps) {
  return (
    <ModalPageProvider>
      <UpdateUserModalContent
        {...props}
      />
    </ModalPageProvider>
  );
};