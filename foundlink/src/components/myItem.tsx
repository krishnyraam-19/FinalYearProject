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
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyItem() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleEdit = async (id:string) =>{
    // e.preventDefault();
    window.location.href= `/editItem/${id}`;
  }

  useEffect(() => {
    fetch("/api/viewMyItem",{ method: "POST" })
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
        {it.status==="PENDING" ? <button onClick={()=>handleEdit(it._id)}>Edit</button> : (null)}
        </div>
      ))}
    </div>
  );
}