import NextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [],
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 5,
  },
  secret: `${process.env.AUTH_SECRET}`,

  callbacks: {
    jwt: async ({ trigger, token, session, user }) => {
      if (trigger === 'update') {
        const updatedToken = token;
        updatedToken.data = session;
        return updatedToken;
      }

      if (user) {
        token.data = user;
      }
      return token;
    },

    session: async ({ session, token }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.token = token.data.token;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.admin = token.data.admin;
      return session;
    },

    authorized: async ({ auth }) => {
      return !!auth;
    },

    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
