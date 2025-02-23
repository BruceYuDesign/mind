import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


async function main() {
  const defaultUser = await prisma.user.upsert({
    where: { id: 'default_user' },
    update: {},
    create: {
      id: 'default_user',
      google_id: 'default_google_id',
      email: 'default_user@gmail.com',
      name: 'Default User',
      avatar: null,
    },
  });
  console.log('------------------------------');
  console.log('Default User:', defaultUser);

  const defaultBlogs = await Promise.all(
    Array.from({ length: 12 }).map((_, index) =>
      prisma.blog.upsert({
        where: { id: `default_blog_${index}` },
        update: {},
        create: {
          id: `default_blog_${index}`,
          slug: `default-blog-no-${index}`,
          title: `Default Blog No.${index}`,
          description: 'This is a default blog.',
          content: '<p>This is a test blog</p><br><p>It is a test blog</p>',
          thumbnail: null,
          author_id: 'default_user',
        },
      })
    ),
  );
  console.log('------------------------------');
  console.log('Default Blogs:', defaultBlogs);
}


(async() => {
  try {
    await main();
  } catch(error) {
    console.error(error);
  } finally {
    await prisma.$disconnect()
  }
})();