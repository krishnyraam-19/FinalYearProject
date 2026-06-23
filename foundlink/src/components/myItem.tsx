// import { cookies } from "next/headers";

// export default async function MyItem() {

//   const baseUrl =
//     process.env.NEXTAUTH_URL || "http://localhost:3000";

//   const res = await fetch(`${baseUrl}/api/viewMyItem`, {
//       method: "POST",
//       headers: { cookie: cookies.toString() },
//        cache: "no-store",
//     });

//   if (!res.ok) return <p>Not authorized or failed to load.</p>;

//   const items = await res.json();

//   return (
//     <div>
//       {items.map((it: any) => (
//         <div key={it._id} className="border p-3 mb-2">
//           <p>{it.title}</p>
//           <p className="text-sm">{it.city} • {it.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyItem() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  const router = useRouter();

  const pendingItems = items.filter((it) => it.status === "PENDING");

  const approvedItems = items.filter(
    (it) => it.status === "APPROVED" && it.resolveStatus !== "RESOLVED"
  );

  const handleEdit = async (id: string) => {
    window.location.href = `/editItem/${id}`;
  };

  const handleResolveStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/item/resolve/${id}`, {
        method: "PUT",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, resolveStatus: "RESOLVED" } : item
        )
      );

      alert("Item marked as resolved");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const r = await fetch("/api/viewMyItem", {
          method: "POST",
        });

        if (r.status === 401) {
  router.push("/logIn");
  return;
}

        if (!r.ok) {
          throw new Error("Unauthorized or failed");
        }

        const data = await r.json();
        setItems(data);
      } catch (e: any) {
        setError(e.message);
      }
    };

    fetchItems();

    const interval = setInterval(fetchItems, 5000);

    return () => clearInterval(interval);
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

  const renderItems = (list: any[]) =>
    list.map((it) => (
      <div
        key={it._id}
        className="flex h-[520px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-emerald-400/40 hover:shadow-xl"
      >
        <img
          src={`/api/viewMyItem/${it._id.toString()}/image`}
          alt={it.title}
          className="h-52 w-full bg-slate-900 object-cover"
        />

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-xl font-black text-white">
              {it.title}
            </h3>

            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                it.status === "PENDING"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-emerald-500/20 text-emerald-300"
              }`}
            >
              {it.status}
            </span>
          </div>

          <p className="text-sm text-slate-300">📍 {it.city}</p>

          <p className="mt-2 text-sm text-slate-400">
            Resolve Status: {it.resolveStatus}
          </p>

          {it.requesters?.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <h4 className="mb-2 font-bold text-emerald-300">
                Contact Requested By
              </h4>

              <div className="space-y-2">
                {it.requesters.slice(0, 2).map((req: any) => (
                  <div
                    key={req.requestId}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-sm"
                  >
                    <p className="text-white">
                      {req.requester?.fname} {req.requester?.lname}
                    </p>

                    <p className="truncate text-slate-300">
                      {req.requester?.email}
                    </p>

                    <p className="text-slate-300">
                      {req.requester?.phone}
                    </p>
                  </div>
                ))}
              </div>

              {it.requesters.length > 2 && (
                <p className="mt-2 text-xs text-slate-400">
                  +{it.requesters.length - 2} more requests
                </p>
              )}
            </div>
          )}

          <div className="mt-auto flex gap-3 pt-4">
            {it.status === "PENDING" && (
              <button
                onClick={() => handleEdit(it._id)}
                className="w-full rounded-xl bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-500"
              >
                Edit Item
              </button>
            )}

            {it.status === "APPROVED" && it.resolveStatus !== "RESOLVED" && (
              <button
                onClick={() => handleResolveStatus(it._id)}
                className="w-full rounded-xl bg-emerald-400 px-4 py-2 font-bold text-slate-950 hover:bg-emerald-300"
              >
                Mark as Resolved
              </button>
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          {/* <p className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            Lost Item Dashboard
          </p> */}

          <h1 className="mt-5 text-5xl font-black">My Items</h1>

          <p className="mt-3 text-slate-300">
            Track your reported items and manage contact requests.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-5 text-3xl font-black text-yellow-300">
            Approval Pending Items
          </h2>

          {pendingItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {renderItems(pendingItems)}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
              No pending items found.
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-5 text-3xl font-black text-emerald-300">
            Approved Items
          </h2>

          {approvedItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {renderItems(approvedItems)}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
              No approved items found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}