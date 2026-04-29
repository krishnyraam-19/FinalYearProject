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
import { useEffect, useState } from "react";

export default function MyItem() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  const pendingItems = items.filter((it) => it.status === "PENDING");
  const approvedItems = items.filter((it) => it.status === "APPROVED");

  const handleEdit = async (id: string) => {
    window.location.href = `/editItem/${id}`;
  };

  useEffect(() => {
    fetch("/api/viewMyItem", { method: "POST" })
      .then(async (r) => {
        if (!r.ok) throw new Error("Unauthorized or failed");
        return r.json();
      })
      .then(setItems)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p>{error}</p>;

  const renderItems = (list: any[]) =>
    list.map((it) => (
      <div key={it._id} className="border p-3 mb-2 rounded">
        <p>{it.title}</p>
        <p className="text-sm">
          {it.city} • {it.status}
        </p>

        <img
          src={`/api/viewMyItem/${it._id.toString()}/image`}
          alt={it.title}
          className="w-40 h-40 object-cover rounded"
        />

        {it.status === "PENDING" && (
          <button onClick={() => handleEdit(it._id)}>Edit</button>
        )}
      </div>
    ));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-3">Pending Items</h2>
        {pendingItems.length > 0 ? renderItems(pendingItems) : <p>No pending items</p>}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Approved Items</h2>
        {approvedItems.length > 0 ? renderItems(approvedItems) : <p>No approved items</p>}
      </div>
    </div>
  );
}