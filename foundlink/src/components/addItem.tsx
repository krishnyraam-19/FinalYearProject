"use client";

import { useState } from "react";

export default function AddItem() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const category = formData.get("category");
    const title = formData.get("title");
    const city = formData.get("city");
    const type = formData.get("type");
    const description = formData.get("description");
    const image = formData.get("image"); // File

    console.log({ category, title, city, type, image, description });

    const res = await fetch("/api/addItem", {
      method: "POST",
      body: formData, // NOT JSON
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }
    setSuccess("Item created sccessfully");
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

  return (
    <>
      <p>Add item</p>

      <form className="mt-6 space-y-5 justify-center" onSubmit={handleSubmit}>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="e.g., iPhone 12 128GB"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Type (Radio) */}
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
                //   checked={type === t}
                //   onChange={() => setType(t)}
                className="h-4 w-4 accent-blue-600"
              />
              <span className="capitalize text-gray-900">Found</span>
              <input
                type="radio"
                name="type"
                value="found"
                //   checked={type === t}
                //   onChange={() => setType(t)}
                className="h-4 w-4 accent-blue-600"
              />
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={5}
            name="description"
            placeholder="Write product details..."
            className="mt-2 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          {/* <div className="mt-1 text-xs text-gray-500">
                {description.length}/500
              </div> */}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select a city</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>

          <div className="mt-2 flex items-center gap-4">
            <label className="cursor-pointer rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600">
              Upload Image
              <input
                type="file"
                accept="image/*"
                // onChange={handleImageChange}
                className="hidden"
                name="image"
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Add Item
        </button>
        <p>{success}</p>
      </form>
    </>
  );
}
