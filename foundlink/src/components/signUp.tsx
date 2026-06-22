"use client";

import { useState } from "react";

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const role = formData.get("role");

    console.log(email, password, role);

    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        phone,
        password,
        role,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setError("");
    setSuccess("User created successfully");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">
          {success}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="fname" className="mb-2 block text-sm font-bold text-slate-700">
            First Name
          </label>
          <input
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/20"
            type="text"
            name="fname"
            id="fname"
            placeholder="First name"
            required
          />
        </div>

        <div>
          <label htmlFor="lname" className="mb-2 block text-sm font-bold text-slate-700">
            Last Name
          </label>
          <input
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/20"
            type="text"
            name="lname"
            id="lname"
            placeholder="Last name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">
          Email Address
        </label>
        <input
          className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/20"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-bold text-slate-700">
          Phone Number
        </label>
        <input
          className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/20"
          type="tel"
          name="phone"
          id="phone"
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-bold text-slate-700">
          Password
        </label>
        <input
          className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/20"
          type="password"
          name="password"
          id="password"
          placeholder="Create a password"
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-700">
          Select Role
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label
            htmlFor="user"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-700 hover:border-emerald-400"
          >
            <input
              type="radio"
              name="role"
              id="user"
              value="user"
              className="h-4 w-4 accent-emerald-500"
            />
            Claimant
          </label>

          <label
            htmlFor="volunteer"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-700 hover:border-emerald-400"
          >
            <input
              type="radio"
              name="role"
              id="volunteer"
              value="volunteer"
              className="h-4 w-4 accent-emerald-500"
            />
            Volunteer
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-black text-slate-950 shadow-lg shadow-emerald-400/30 transition hover:bg-emerald-300"
      >
        Sign Up
      </button>
      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <a
          href="/logIn"
          className="font-bold text-emerald-500 hover:text-emerald-400"
        >
          Log In
        </a>
      </p>
    </form>
  );
}