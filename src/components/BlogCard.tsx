import Link from 'next/link';


export interface BlogCardProps {
  blog_id: string;
  slug: string;
  account: string;
  title: string;
  description: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  groups: string[];
};


export default function BlogCard(props: BlogCardProps) {
  const { blog_id, account, title, description, slug } = props;
  return (
    <Link
      className='util-border
      flex flex-col gap-2 cursor-pointer px-6 py-4 rounded-2xl'
      href={`/${account}/${slug}/${blog_id}`}
      scroll={false}
    >
      <div className='w-full aspect-opengraph bg-secondary-200'></div>
      <Link
        className='flex flex-row gap-2 items-center'
        href={`/${account}`}
        scroll={false}
      >
        <div className='w-8 h-8 rounded-full bg-secondary-200'></div>
        <p className='text-sm'>
          {account}
        </p>
      </Link>
      <p className='font-bold text-2xl'>
        {title}
      </p>
      <p>
        {description}
      </p>
    </Link>
  );
};