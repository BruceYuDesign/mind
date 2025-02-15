import Link from 'next/link';


export interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  updated_at: string;
  author: {
    id: string,
    name: string,
    avatar: string,
  }
};


export default function BlogCard(props: BlogCardProps) {
  return (
    <Link
      className='util-border
      flex flex-col gap-2 cursor-pointer px-6 py-4 rounded-2xl'
      href={`/${props.author.id}/${props.slug}/${props.id}`}
      scroll={false}
    >
      <div
        className='w-full aspect-opengraph bg-secondary-200 bg-center bg-no-repeat bg-cover'
        style={{
          backgroundImage: props.thumbnail,
        }}
      ></div>
      <Link
        className='flex flex-row gap-2 items-center'
        href={`/${props.author.id}`}
        scroll={false}
      >
        <div
          className='w-8 h-8 rounded-full bg-secondary-200 bg-center bg-no-repeat bg-cover'
          style={{
            backgroundImage: props.author.avatar,
          }}
        ></div>
        <p className='text-sm'>
          {props.author.name}
        </p>
      </Link>
      <p className='font-bold text-2xl'>
        {props.title}
      </p>
      <p>
        {props.description}
      </p>
    </Link>
  );
};