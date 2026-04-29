"use client";
import { useEffect, useState } from "react";

export default function ItemApproval() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleApprove = async (id: string) => {
    const res = await fetch(`/api/adminPendingApproval/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (res.ok) {
      alert("Approved successfully");
      setItems((prev) => prev.filter((it) => it._id !== id));
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    fetch("/api/adminPendingItemView", { method: "POST" })
      .then(async (r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then(setItems)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">All Pending User Items</h1>

      {items.length === 0 ? (
        <p>No pending submissions</p>
      ) : (
        items.map((it) => (
          <div
            key={it._id}
            className="border rounded-xl p-4 mb-5 shadow flex gap-5 items-center"
          >
            <img
              src={`/api/viewMyItem/${it._id.toString()}/image`}
              alt={it.title}
              className="w-40 h-40 rounded object-cover"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold">{it.title}</h2>
              <p>{it.city}</p>
              <p>{it.category}</p>
              <p>{it.description}</p>
              <p className="text-sm mt-2">Posted by: {it.createdByEmail}</p>
              <p className="text-sm">Type: {it.type}</p>
            </div>

            <button
              onClick={() => handleApprove(it._id)}
              className="bg-green-600 text-white px-5 py-2 rounded"
            >
              Approve
            </button>
          </div>
        ))
      )}
    </div>
  );
}