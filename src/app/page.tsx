import SearchBox from '@/components/SearchBox';


export default function Home() {
  return (
    <div
      className='util-container
      flex flex-col items-center gap-8 pt-20'
    >
      <h1 className='text-9xl font-bold'>
        MiND
      </h1>
      <h2 className='text-4xl font-bold'>
        隨時記錄你的想法
      </h2>
      <button
        className=''
        type='button'
      >
        建立你的想法
      </button>
      <span>
        或是
      </span>
      <p>
        尋找你的想法
      </p>
      <SearchBox/>
    </div>
  );
};