import 'server-only';
import { prisma } from '@/app/api/utils/prisma';
import BlogList from '@/components/BlogList';
import Tools from './components/Tools';


interface AccountPageProps {
  params: {
    account: string;
  };
};


export default async function AccountPage(props: AccountPageProps) {


  const userData = await prisma.user.findUnique({
    where: {
      account: props.params.account,
    },
    select: {
      id: true,
      account: true,
      name: true,
      about: true,
      avatar: true,
      provider: true,
    },
  });


  if (!userData) {
    return (
      <div
        className='util-container
        w-screen h-screen flex items-center justify-center text-4xl'
      >
        404 ：）
      </div>
    );
  };


  return (
    <div
      className='util-container
      flex flex-col gap-4'
    >
      <div className='flex flex-row gap-8'>
        <div
          className='w-40 h-40 rounded-full bg-secondary-200 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${userData.avatar})` || 'none',
          }}
        />
        <div>
          <h1 className='text-4xl font-bold'>
            {userData.name}
          </h1>
          <p>
            {userData.about}
          </p>
        </div>
      </div>
      <Tools
        account={userData.account}
        name={userData.name}
        about={userData.about || ''}
        avatar={userData.avatar || ''}
        provider={userData.provider}
      />
      <BlogList
        queryParams={{
          account: userData.account,
        }}
      />
    </div>
  );
};