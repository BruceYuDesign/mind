import Link from 'next/link';


export default function Header() {
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
        <Link
          href='/bruce'
          scroll={false}
        >
          <div className='w-12 h-12 rounded-full bg-secondary-200'></div>
        </Link>
      </div>
    </header>
  );
};