import Link from 'next/link';


export default function Header() {
  return (
    <header
      className='util-container
      fixed top-4 left-0 right-0 bg-background text-foreground z-10
      border border-slate-100 shadow-slate-200 shadow-md rounded-full'
    >
      <div
        className='util-container
        h-[72px] flex flex-row justify-between items-center'
      >
        <Link
          className='text-3xl font-bold'
          href='/'
        >
          MiND
        </Link>
        <Link
          href='/bruce'
        >
          <div className='w-12 h-12 rounded-full bg-slate-200'></div>
        </Link>
      </div>
    </header>
  );
};