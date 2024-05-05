import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/calendar.readonly',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return account ? account.provider === "google" : false;
    },    
    async redirect({ url, baseUrl }) {
      return baseUrl + '/calendar';
    },
    async jwt({ token, account }) {
      if (account && account.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },    
    async session({ session, token }) {
      if (token && token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page (if any)
    error: '/auth/error', // Error page path (if any)
  },
  secret: process.env.NEXTAUTH_SECRET,
});
