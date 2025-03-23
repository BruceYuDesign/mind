'use client';
import type { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SessionProvider, useSession, signIn } from 'next-auth/react';


// TODO 模組化型別
interface ExtendedSession extends Session {
  expires: string;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    account: string;
  };
};


function HeaderContent() {
  const router = useRouter();
  const { data: session } = useSession();


  const handleClick = () => {
    if (session) {
      router.push(`/${(session as ExtendedSession).user?.account}`, { scroll: false });
    } else {
      signIn();
    };
  };


  return (
    <header className='sticky top-0 pt-[32px]'>
      <div
        className='util-container util-border
        h-[var(--header-h)] px-[calc(var(--header-h)/2)] flex flex-row justify-between items-center bg-white rounded-full z-10'
      >
        <Link
          className='text-3xl font-bold'
          href='/'
          scroll={false}
        >
          MiND
        </Link>
        <button
          onClick={handleClick}
          type='button'
        >
          <div
            className='w-12 h-12 rounded-full bg-secondary-200 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url(${session?.user?.image})` || 'none',
            }}
          >
          </div>
        </button>
      </div>
    </header>
  );
};


export default function Header() {
  return (
    <SessionProvider>
      <HeaderContent/>
    </SessionProvider>
  );
};