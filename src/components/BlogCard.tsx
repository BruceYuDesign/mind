export interface BlogCardProps {
  id: number;
  title: string;
  desc: string;
};


export default function BlogCard(props: BlogCardProps) {
  const { id, title, desc } = props;
  return (
    <a
      className='flex flex-col gap-2 text-foreground cursor-pointer bg-background px-6 py-4 border border-slate-100 shadow-slate-200 shadow-md rounded-2xl'
    >
      <div
        className='w-full aspect-opengraph bg-slate-200'
      >
      </div>
      <p className='font-bold text-2xl'>
        {title}
      </p>
      <p>
        {desc}
      </p>
    </a>
  );
};