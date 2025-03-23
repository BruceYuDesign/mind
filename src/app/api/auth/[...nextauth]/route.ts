import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/app/api/utils/prisma';


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Your email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("請輸入 Email 和 密碼");
        }

        // TODO 於平台註冊的用戶登入

        // const user = await getUserByEmail(credentials.email); // 你需要實作這個函數
        // if (!user) {
        //   throw new Error("帳號不存在");
        // }

        // const isValid = await compare(credentials.password, user.password); // 驗證密碼
        // if (!isValid) {
        //   throw new Error("密碼錯誤");
        // }

        return { id: 'id', name: 'name', email: 'email' }; // 驗證成功返回 user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account && token.email) {
        // 檢查是否已存在
        const user = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (user) {
          token.id = user.id;
          token.account = user.account;
        } else {
          // 創建使用者
          const newUser = await prisma.user.create({
            data: {
              email: token.email,
              name: token.name as string,
              avatar: token.picture as string,
              // TODO 自動生成的帳號加入後綴 "-123456"
              account: token.email.split('@')[0],
              provider: 'GOOGLE',
            },
          });
          token.id = newUser.id;
          token.account = newUser.account;
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          // TODO 危險，須考慮加密
          id: token.id,
          account: token.account,
        },
      };
    },
  },
});


export { handler as GET, handler as POST };