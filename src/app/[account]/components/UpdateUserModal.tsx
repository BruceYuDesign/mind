'use client';
import Modal from '@/components/Modal';


interface UpdateUserModalProps {
  account: string;
  name: string;
  email: string;
  avatar: string;
};


export default function UpdateUserModal(props: UpdateUserModalProps) {


  return (
    <Modal
      id='update-user'
      title='修改個人資料'
      size='md'
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
      <p>
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