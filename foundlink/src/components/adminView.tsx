"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MyContactRequests from "./requestedItems";

export default function AdminView() {

  const { data: session } = useSession();

  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  const role = session?.user?.role;

  const handleEdit = async (id: string) => {
    window.location.href = `/editItem/${id}`;
  };

  const handleContactRequest = async (itemId: string) => {
  try {
    const response = await fetch("/api/contactRequest/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? { ...item, resolveStatus: "CONTACTREQUESTED" }
          : item
      )
    );

    alert("Contact request sent successfully");
  } catch (error: any) {
    alert(error.message);
  }
};

useEffect(() => { fetch("/api/adminView", { method: "POST" }) .then(async (r) => { if (!r.ok) throw new Error("Unauthorized or failed"); return r.json(); }) .then(setItems) .catch((e) => setError(e.message)); }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>

      {items.map((it) => (

        <div key={it._id}>

          <div className="border p-3 mb-2">

            <p>{it.title}</p>

            <p className="text-sm">
              {it.city} • {it.status}
            </p>

            <p className="text-sm">
              {it.resolveStatus}
            </p>

            <img
              src={`/api/viewMyItem/${it._id.toString()}/image`}
              alt={it.title}
              className="w-40 h-40 object-cover rounded"
            />

          </div>

          {/* ADMIN BUTTON */}
          {role === "admin" && it.status === "PENDING" && (
            <button
              onClick={() => handleEdit(it._id)}
              className="bg-green-500 text-white px-3 py-1 rounded mr-2"
            >
              Approve
            </button>
          )}

          {/* VOLUNTEER BUTTON */}
          {role === "volunteer" && it.resolveStatus === "DUE" && (
            <button
              onClick={() => handleContactRequest(it._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Send Contact Request
            </button>
          )}

        </div>

      ))}
      <div>
        <MyContactRequests/>
      </div>

    </div>
  );
}