"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminView() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleEdit = async (id:string) =>{
    // e.preventDefault();
    window.location.href= `/editItem/${id}`;
  }

  useEffect(() => {
    fetch("/api/adminView",{ method: "POST" })
      .then(async (r) => {
        if (!r.ok) throw new Error("Unauthorized or failed");
        return r.json();
      })
      .then(setItems)
      .catch((e) => setError(e.message));
  }, []);
  
  if (error) return <p>{error}</p>;

  return (
    <div>
      {items.map((it) => (
        <div>
        {/* <Link key={it._id} href={`/editItem/${it._id}`}> */}
        <div className="border p-3 mb-2">
          <p>{it.title}</p>
          <p className="text-sm">{it.city} • {it.status}</p>
          <img
          src={`/api/viewMyItem/${it._id.toString()}/image`}
          alt={it.title}
          className="w-40 h-40 object-cover rounded"
          />
          
        </div>
        {/* </Link> */}
        {it.status==="PENDING" ? <button onClick={()=>handleEdit(it._id)}>Approve</button> : (null)}
        </div>
      ))}
    </div>
  );
}