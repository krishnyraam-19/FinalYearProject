import Link from "next/link";
import MainHeader from "@/components/mainHeader";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <div className="bg-slate-950 text-white">

      {/* HERO */}
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-10 pt-32">
        <div className="mx-auto max-w-7xl grid min-h-[85vh] items-center gap-12 md:grid-cols-2">

          <div>
            <p className="inline-block rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
              Lost & Found Management System
            </p>

            <h1 className="mt-8 text-6xl md:text-7xl font-black leading-tight">
              Find lost items
              <span className="block text-emerald-400">
                Return them safely
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-xl text-slate-300">
              Report lost items, search found items, request contact and reconnect belongings with their rightful owners.
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                href="/viewItem"
                className="rounded-full bg-emerald-400 px-8 py-4 font-black text-slate-950 shadow-lg"
              >
                View Lost Items
              </Link>

              <Link
                href="/addItem"
                className="rounded-full border border-white/20 px-8 py-4 font-black"
              >
                Report Item
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur">
            <h2 className="mb-6 text-3xl font-black">
              System Overview
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Card title="120+" subtitle="Items Posted" />
              <Card title="45+" subtitle="Resolved" />
              <Card title="30+" subtitle="Pending" />
              <Card title="15+" subtitle="Volunteers" />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-900 px-10 py-20">
        <div className="mx-auto max-w-7xl">

          <h2 className="mb-12 text-center text-5xl font-black">
            System Features
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Feature title="Lost Items" text="Search reported lost items." />
            <Feature title="Found Items" text="View found items submitted by users." />
            <Feature title="Admin Approval" text="Admin can approve and manage items." />
            <Feature title="Contact Requests" text="Secure contact request process." />
            <Feature title="Resolved Items" text="Track recovered items." />
            <Feature title="Ratings & Feedback" text="Rate and provide feedback." />
          </div>

        </div>
      </section>

    </div>
  );
}

function Card({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-6 text-center">
      <h3 className="text-4xl font-black text-emerald-400">
        {title}
      </h3>

      <p className="mt-2 text-slate-300">
        {subtitle}
      </p>
    </div>
  );
}

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-3 text-xl font-black">
        {title}
      </h3>

      <p className="text-slate-300">
        {text}
      </p>
    </div>
  );
}