"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function MainHeader() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <nav className="flex items-center justify-between px-10 py-5">
        <Link href="/" className="text-3xl font-black text-white">
          Found<span className="text-emerald-400">Link</span> LK
        </Link>

        <div className="hidden gap-6 text-sm font-bold text-white md:flex">
          <Link href="/" className="hover:text-emerald-400">
            Home
          </Link>

          {session?.user?.role === "user" && (
            <>
              <Link href="/addItem" className="hover:text-emerald-400">
                Add Lost Item
              </Link>
              <Link href="/viewItem" className="hover:text-emerald-400">
                View My Items
              </Link>
              <Link href="/adminView" className="hover:text-emerald-400">
                View All Items
              </Link>
              <Link href="/viewResolvedItem" className="hover:text-emerald-400">
                Resolved Items
              </Link>
            </>
          )}

          {session?.user?.role === "volunteer" && (
            <>
              <Link href="/viewMyFoundItem" className="hover:text-emerald-400">
                View Found Items
              </Link>
              <Link href="/addFoundItem" className="hover:text-emerald-400">
                Add Found Item
              </Link>
              <Link href="/adminView" className="hover:text-emerald-400">
                View Lost Items
              </Link>
              <Link href="/contactRequests" className="hover:text-emerald-400">
                View My Contact Requests
              </Link>
              <Link href="/viewRating" className="hover:text-emerald-400">
                View Ratings
              </Link>
            </>
          )}

          {session?.user?.role === "admin" && (
            <>
              <Link href="/adminView" className="hover:text-emerald-400">
                View Items
              </Link>
              <Link href="/approvePosts" className="hover:text-emerald-400">
                Approve Posts
              </Link>
              <Link href="/contactRequests" className="hover:text-emerald-400">
                Approve Contact Requests
              </Link>
              <Link href="/adminAnalytics" className="hover:text-emerald-400">
                Analytical Summary
              </Link>

            </>
          )}

          {!session && (
            <>
              {/* <Link href="/viewItem" className="hover:text-emerald-400">
                Lost Items
              </Link> */}
              <Link href="/about" className="hover:text-emerald-400">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-emerald-400">
                Contact Us
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Link
                href="/logIn"
                className="font-bold text-white hover:text-emerald-400"
              >
                Login
              </Link>

              <Link
                href="/signUp"
                className="rounded-full bg-emerald-400 px-6 py-3 font-black text-slate-950 hover:bg-emerald-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <p className="font-bold text-emerald-400">
                {session.user?.name}
              </p>

              <button
                onClick={() => signOut({ callbackUrl: "/logIn" })}
                className="cursor-pointer rounded-full bg-emerald-400 px-6 py-3 font-black text-slate-950 hover:bg-emerald-300"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}