"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResolvedItems() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/viewMyItem", { method: "POST" })
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed to fetch items");
        return r.json();
      })
      .then((data) => {
        setItems(data.filter((it: any) => it.resolveStatus === "RESOLVED"));
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <section className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          {/* <p className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            Completed Cases
          </p> */}

          <h1 className="mt-5 text-5xl font-black">
            Resolved Items
          </h1>

          <p className="mt-3 text-slate-300">
            View successfully resolved lost item cases and submit feedback.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            No resolved items found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((it) => (
              <div
                key={it._id}
                className="flex h-[420px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-emerald-400/40 hover:shadow-xl"
              >
                <img
                  src={`/api/viewMyItem/${it._id.toString()}/image`}
                  alt={it.title}
                  className="h-52 w-full bg-slate-900 object-cover"
                />

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-col gap-3">
                    <h3 className="line-clamp-2 break-words text-xl font-black text-white">
                      {it.title}
                    </h3>

                    <span className="w-fit rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                      RESOLVED
                    </span>
                  </div>

                  <p className="text-sm text-slate-300">
                    📍 {it.city}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Status: {it.status}
                  </p>

                  <button
                    onClick={() => router.push(`/feedBackForm/${it._id}`)}
                    className="mt-auto w-full rounded-xl bg-emerald-400 px-4 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
                  >
                    Send Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}