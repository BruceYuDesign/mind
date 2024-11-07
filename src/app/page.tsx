import Search from '@/components/Search';


export default function Home() {
  return (
    <div
      className='util-container
      flex flex-col items-center gap-8'
    >
      <h1 className='text-9xl font-bold'>
        MiND
      </h1>
      <h2 className='text-4xl font-bold'>
        隨時記錄你的想法
      </h2>
      <Search/>
    </div>
  );
};