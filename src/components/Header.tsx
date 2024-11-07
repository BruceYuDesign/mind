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
        <h1
          className='text-3xl font-bold'
        >
          MiND
        </h1>
        <ul className='flex flex-row gap-4'>
          <li
            className='text-base cursor-pointer hover:underline'
          >
            登入
          </li>
          <li
            className='text-base cursor-pointer hover:underline'
          >
            註冊
          </li>
        </ul>
      </div>
    </header>
  );
};