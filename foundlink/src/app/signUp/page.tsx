import SignUp from "@/components/signUp";

export default function SignUpPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            Create Your Account
          </p>

          <h1 className="mt-6 text-5xl font-black">
            Join <span className="text-emerald-400">FoundLink LK</span>
          </h1>

          <p className="mt-4 text-slate-300">
            Register as a user or volunteer to report items, manage requests,
            and help recover lost belongings.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-10 text-slate-950 shadow-2xl">
          <SignUp />
        </div>
      </div>
    </section>
  );
}