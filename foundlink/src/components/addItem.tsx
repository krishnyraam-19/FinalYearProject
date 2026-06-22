"use client";

import { useState } from "react";

export default function AddItem() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("type", "lost");

    const res = await fetch("/api/addItem", {
      method: "POST",
      body: formData, // NOT JSON
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }
    setSuccess("Item Added Successfully");
  };

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Books",
    "Sports",
    "Other",
  ];
  const cities = [
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Kurunegala",
    "Negombo",
    "Other",
  ];

  const [fileName, setFileName] = useState("");

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          {/* <p className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
          Lost Item Report
        </p> */}

          <h1 className="mt-5 text-4xl font-black text-white">Add Lost Item</h1>

          <p className="mt-3 text-slate-300">
            Submit item details to help others identify and return it safely.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-300">
              Category
            </label>

            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-300">
              Title
            </label>

            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="e.g., iPhone 12 128GB"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-300">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              placeholder="Write item details..."
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-300">
              City
            </label>

            <select
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            >
              <option value="">Select a city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-300">
              Item Image
            </label>

            <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-emerald-400/40 bg-emerald-400/10 px-4 py-5 text-sm font-bold text-emerald-300 hover:bg-emerald-400/20">
              Upload Image
              <input
                type="file"
                accept="image/*"
                name="image"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setFileName(file.name);
                  }
                }}
              />
            </label>

            {fileName && (
              <p className="mt-3 text-sm text-emerald-300">✓ {fileName}</p>
            )}
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-300">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-emerald-400 px-4 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Add Item
          </button>
        </form>
      </div>
    </section>
  );
}
