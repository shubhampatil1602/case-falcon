import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { loginSchema } from './lib/schemas';
import bcryptjs from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import db from './lib/db';

export default {
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // only way for successful login is if user object is returned from this authorize function
        let user = null;

        // validate credentials
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.log('Invalid credentials', parsedCredentials.error.errors);
          return null;
        }

        // get user
        user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          console.log('Invalid credentials');
          return null;
        }

        if (!user.password) {
          throw new Error(
            'No password provided, Try with google or github provider'
          );
          // return null;
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordValid) {
          console.log('Invalid password');
          return null;
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Redirect logged-in users away from auth pages
      if (['/sign-up', '/sign-in'].includes(pathname) && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      // Allow access to home and auth pages only if not logged in
      if (['/', '/sign-up', '/sign-in'].includes(pathname) || !isLoggedIn) {
        return true; // Allow access
      }

      // Allow access to other pages only if logged in
      return isLoggedIn;
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
} satisfies NextAuthConfig;
