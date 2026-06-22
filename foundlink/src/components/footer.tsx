import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-10 py-10 text-white">
      <div className="grid gap-8 md:grid-cols-3">

        {/* Logo */}
        <div>
          <h3 className="text-2xl font-black">
            Found<span className="text-emerald-400">Link</span> LK
          </h3>

          <p className="mt-3 text-slate-400">
            Sri Lanka's Lost & Found Management Platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-xl font-bold">
            Quick Links
          </h4>

          <div className="space-y-3">
            <Link
              href="/"
              className="block text-slate-400 hover:text-emerald-400"
            >
              Home
            </Link>

            <Link
              href="/viewItem"
              className="block text-slate-400 hover:text-emerald-400"
            >
              Lost Items
            </Link>

            <Link
              href="/about"
              className="block text-slate-400 hover:text-emerald-400"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="block text-slate-400 hover:text-emerald-400"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-xl font-bold">
            Contact
          </h4>

          <p className="text-slate-400">
            support@foundlink.lk
          </p>

          <p className="mt-2 text-slate-400">
            Colombo, Sri Lanka
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5 text-center text-slate-500">
        © 2026 Found Link LK. All Rights Reserved.
      </div>
    </footer>
  );
}