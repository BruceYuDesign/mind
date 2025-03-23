'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
import BlogList from '@/components/BlogList';


function SearchPageContent() {
  const searchText = useSearchParams().get('text') || '';


  useEffect(() => {

  }, [searchText]);


  return (
    <div
      className='util-container
      flex flex-col items-center gap-8 pt-8'
    >
      <SearchBox
        defaultValue={searchText}
      />
      <BlogList
        queryParams={{
          text: searchText,
        }}
      />
    </div>
  );
};


export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent/>
    </Suspense>
  );
};