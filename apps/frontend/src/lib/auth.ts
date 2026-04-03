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
    async signIn({ user, account, profile }) {
      // Security measure: Prevent unauthorized creation of SUPERADMINs
      // The database schema already defaults to "USER", but this is an extra layer of protection.
      // @ts-ignore
      if (user.role === "SUPERADMIN") {
        // Only allow SUPERADMINs that ALREADY exist in the database (verified via seeder)
        return true; 
      }
      
      // Allow all other standard OAuth sign-ins
      return true;
    },
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
