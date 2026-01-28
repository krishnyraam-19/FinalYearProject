import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";
import { redirect } from "next/navigation";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as const},

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

        console.log("password", password);
        console.log("userPass", user.password);
        console.log("ok", ok);
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
    async jwt({ token, user }:any) {
      // first login only
      // console.log(user.id);
      if (user?.id) token.id = String((user as any).id);
      return token;
      // redirect("/");
    },
    async session({ session, token }:any) {
      // make user id available in client
      (session.user as any).id = token.id; // <-- use sub
      return session;
    },
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const runtime = "nodejs"; // b
