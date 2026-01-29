"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditItemForm({ item }: { item: any }) {
  const router = useRouter();

  const [title, setTitle] = useState(item.title || "");
  const [city, setCity] = useState(item.city || "");
  const [description, setDescription] = useState(item.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("city", city);
    fd.append("description", description);
    if (imageFile) fd.append("image", imageFile);

    const res = await fetch(`/api/items/${item._id}`, {
      method: "PATCH",
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMsg(err.error || "Update failed");
      return;
    }

    setMsg("Updated!");
    // router.push("/viewItem"); // or router.back()
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-4">
      <h1 className="text-xl font-semibold">Edit Item</h1>

      <input
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <input
        className="border p-2 w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />

      <textarea
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      {msg && <p className="text-sm">{msg}</p>}

      <button className="bg-black text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}