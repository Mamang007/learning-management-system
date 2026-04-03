import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, users, accounts, sessions, verificationTokens } from "@lms/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Pass the user role to the session for RBAC checks
      if (session.user) {
        // @ts-ignore - Auth.js types are complex for custom columns
        session.user.id = user.id;
        // @ts-ignore
        session.user.role = user.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
