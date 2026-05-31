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

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Resolved Items</h2>

      {items.length === 0 ? (
        <p>No resolved items</p>
      ) : (
        items.map((it) => (
          <div key={it._id} className="border p-3 mb-2 rounded">
            <p>{it.title}</p>
            <p className="text-sm">
              {it.city} • {it.status}
            </p>
            <p className="text-green-600 font-semibold">RESOLVED</p>
            <button
              onClick={() => router.push(`/feedBackForm/${it._id}`)}
              className="bg-green-500 text-white px-3 py-1 rounded mt-2"
            >
              Send a feedback
            </button>
          </div>
        ))
      )}
    </div>
  );
}
