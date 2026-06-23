"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-bold text-slate-700"
        >
          Email Address
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-bold text-slate-700"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
          required
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-400 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
      >
        Log In
      </button>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <a
          href="/signUp"
          className="font-bold text-emerald-500 hover:text-emerald-400"
        >
          Sign Up
        </a>
      </p>
    </form>
  );
}