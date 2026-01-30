"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditItemForm({ item }: { item: any }) {
  const router = useRouter();

  const [title, setTitle] = useState(item.title || "");
  const [city, setCity] = useState(item.city || "");
  const [description, setDescription] = useState(item.description || "");
  const [type, setType] = useState(item.type || "");
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
      <label htmlFor="title">Title</label>
      <input
        id="title"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <label htmlFor="city">Title</label>
      <input
        id="city"
        className="border p-2 w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      {/* <label htmlFor="image">Image</label> */}
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />
      
      <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <label className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm">
              <span className="capitalize text-gray-900">Lost</span>

              <input
                type="radio"
                name="type"
                value="lost"
                checked={type === "lost"}
                //   onChange={() => setType(t)}
                className="h-4 w-4 accent-blue-600"
              />
              <span className="capitalize text-gray-900">Found</span>
              <input
                type="radio"
                name="type"
                value="found"
                  checked={type === "found"}
                //   onChange={() => setType(t)}
                className="h-4 w-4 accent-blue-600"
              />
            </label>
          </div>
        </div>

      {msg && <p className="text-sm">{msg}</p>}

      <button className="bg-black text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}