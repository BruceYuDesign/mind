'use client';
import { useState, useEffect } from 'react';


interface BlogPageProps {
  params: {
    account: string;
  };
};


export default function BlogPage(props: BlogPageProps) {
  const [introduce, setIntroduce] = useState('');
  const [avatar, setAvatar] = useState('');


  const introduceOnChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(event.target.value);
  }


  useEffect(() => {
    const getIntroduce = async () => {
      // TODO: request
      await new Promise(resolve => setTimeout(resolve, 500));
      setIntroduce('hello world');
      setAvatar('https://via.placeholder.com/150');
    }
    getIntroduce();
  }, []);


  return (
    <div>
      <div>
        <img
          src={avatar}
          alt='avatar'
        />
        <input
          type='file'
          accept='image/png, image/gif, image/jpeg'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                setAvatar(reader.result as string);
              }
            };
            if (event.target.files) {
              reader.readAsDataURL(event.target.files[0]);
            }
          }}
        />
      </div>
      <textarea
        value={introduce}
        onChange={introduceOnChange}
      />
    </div>
  );
};