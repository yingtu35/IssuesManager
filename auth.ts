import NextAuth from "next-auth";
import github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth"

export const config = {
  providers: [
    // Set scope to repo to access user's private repositories
    github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: { scope: "repo" },
      }
    }),
  ],
  pages: {
    signIn: "/", // ? Redirect to home page
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, { access_token: token.access_token })
        // console.log("session", session);
      }
      return session;
    },
    // * authorized is called when a user visits a page that requires authentication
    authorized({ auth, request: { nextUrl } }) {
      // console.log("auth", auth);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);