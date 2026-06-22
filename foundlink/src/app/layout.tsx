import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import AuthProvider from "@/lib/sessionProvider";

import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import MainHeader from "@/components/mainHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Found Link LK",
  description: "Lost & Found Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 text-white antialiased`}
      >
        <AuthProvider session={session}>
          <MainHeader/>
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}