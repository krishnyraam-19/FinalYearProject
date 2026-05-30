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

  const approvedItems = items.filter((it) => it.status === "APPROVED" && it.resolveStatus !== "RESOLVED");

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
          item._id === id
            ? {
                ...item,
                resolveStatus: "RESOLVED",
              }
            : item,
        ),
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

        if (!r.ok) {
          throw new Error("Unauthorized or failed");
        }

        const data = await r.json();

        setItems(data);
      } catch (e: any) {
        setError(e.message);
      }
    };

    // initial fetch
    fetchItems();

    // polling every 5 seconds
    const interval = setInterval(fetchItems, 5000);

    // cleanup
    return () => clearInterval(interval);
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
          <button
            onClick={() => handleEdit(it._id)}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            Edit
          </button>
        )}

        {it.status === "APPROVED" && it.resolveStatus !== "RESOLVED" && (
          <button onClick={() => handleResolveStatus(it._id)}>
            Mark As Resolved
          </button>
        )}

        {/* REQUESTERS */}
        {it.requesters?.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <h3 className="font-semibold mb-2">Contact Requests</h3>

            {it.requesters.map((req: any) => (
              <div
                key={req.requestId}
                className="border p-2 mb-2 rounded bg-gray-50"
              >
                <p>
                  <strong>Name:</strong> {req.requester?.fname}{" "}
                  {req.requester?.lname}
                </p>

                <p>
                  <strong>Email:</strong> {req.requester?.email}
                </p>

                <p>
                  <strong>Phone:</strong> {req.requester?.phone}
                </p>

                {/* <p>
                  <strong>Status:</strong>{" "}
                  {req.status}
                </p> */}
              </div>
            ))}
          </div>
        )}
      </div>
    ));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-3">Pending Items</h2>

        {pendingItems.length > 0 ? (
          renderItems(pendingItems)
        ) : (
          <p>No pending items</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Approved Items</h2>

        {approvedItems.length > 0 ? (
          renderItems(approvedItems)
        ) : (
          <p>No approved items</p>
        )}
      </div>
    </div>
  );
}
