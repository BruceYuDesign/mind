import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';


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
});


export { handler as GET, handler as POST };