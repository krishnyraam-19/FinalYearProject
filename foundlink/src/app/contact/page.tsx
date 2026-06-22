import Link from "next/link";
import MainHeader from "@/components/mainHeader";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-10 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <p className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
              Contact Us
            </p>

            <h1 className="mt-6 text-5xl font-black">
              Need help with a lost or found item?
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Contact the FoundLink LK support team for help with item reports,
              contact requests, approvals, or account-related support.
            </p>

            <div className="mt-8 space-y-4">
              <Info title="Email" text="support@foundlink.lk" />
              <Info title="Location" text="Colombo, Sri Lanka" />
              <Info title="Support Time" text="Monday to Friday, 9.00 AM - 5.00 PM" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl">
            <h2 className="text-3xl font-black">Send a Message</h2>

            <form className="mt-6 space-y-5">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />

              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />

              <textarea
                placeholder="Your message"
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />

              <button
                type="button"
                className="w-full rounded-full bg-emerald-400 px-6 py-4 font-black text-slate-950 hover:bg-emerald-300"
              >
                Submit Message
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-400">
              Or go back to{" "}
              <Link href="/viewItem" className="text-emerald-400">
                Lost Items
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
      <h3 className="font-black text-emerald-400">{title}</h3>
      <p className="mt-2 text-slate-300">{text}</p>
    </div>
  );
}