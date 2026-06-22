import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-10 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            About FoundLink LK
          </p>

          <h1 className="mt-6 text-5xl font-black">
            Helping people recover lost items safely.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            FoundLink LK is a lost and found management system designed to help
            users report lost items, view approved item posts, and connect with
            the right person through a secure process.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card title="Our Mission" text="To make lost item recovery easier, faster, and safer." />
            <Card title="Our System" text="Admin-approved item posting with proper tracking." />
            <Card title="Our Users" text="Built for students, staff, visitors, and the public." />
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-white/10 p-8">
            <h2 className="text-3xl font-black text-emerald-400">
              Why FoundLink LK?
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Point text="View only approved lost and found item posts." />
              <Point text="Submit lost or found items easily." />
              <Point text="Admin approval process for safer publishing." />
              <Point text="Contact request workflow to protect user details." />
            </div>
          </div>

          <Link
            href="/viewItem"
            className="mt-10 inline-block rounded-full bg-emerald-400 px-8 py-4 font-black text-slate-950 hover:bg-emerald-300"
          >
            View Lost Items
          </Link>
        </div>
      </section>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-3 text-slate-300">{text}</p>
    </div>
  );
}

function Point({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-slate-950/60 p-4 text-slate-300">
      ✓ {text}
    </div>
  );
}