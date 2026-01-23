import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";
import { redirect } from "next/navigation";

export const handler = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;

        await connectToDatabase();

        const user = await User.findOne({ email });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password);
        // const ok = password === user.password;

        console.log("password",password);
        console.log("userPass",user.password);
        console.log("ok",ok);
        if (!ok) return null;

        // return minimal safe fields
        return {
          id: user._id.toString(),
          name: user.fname,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // first login only
      if (user) token.id = (user as any).id;
      return token;
      redirect("/")
    },
    async session({ session, token }) {
      // make user id available in client
      (session.user as any).id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
export const runtime = "nodejs"; // b
