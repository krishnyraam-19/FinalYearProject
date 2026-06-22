"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MyContactRequests from "./requestedItems";

export default function AdminView() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const role = (session?.user as any)?.role;

  const uniqueCities = [...new Set(items.map((i) => i.city).filter(Boolean))];
  const uniqueCategories = [
    ...new Set(items.map((i) => i.category).filter(Boolean)),
  ];

  const fetchItems = async (searchText = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/adminView", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unauthorized or failed");
      }

      setItems(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchItems("");
    }
  }, [status]);

  const handleEdit = (id: string) => {
    router.push(`/editItem/${id}`);
  };

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const filteredItems = items.filter((item) => {
    const cityMatch =
      selectedCities.length === 0 || selectedCities.includes(item.city);

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    return cityMatch && categoryMatch;
  });

  const handleSearch = () => {
    fetchItems(search);
  };

  const handleClear = () => {
    setSearch("");
    setSelectedCities([]);
    setSelectedCategories([]);
    fetchItems("");
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
        throw new Error(data.message || "Failed to send request");
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

  if (status === "loading") return <p>Loading session...</p>;

  if (status === "unauthenticated") {
    return <p>Please login first.</p>;
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="flex gap-6">
      <div className="sticky top-24 h-fit w-72 rounded border border-white/10 p-4">
        <h2 className="mb-4 text-lg font-bold">Search & Filters</h2>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2 text-slate-900"
        />

        <div className="mb-6 flex gap-2">
          <button
            onClick={handleSearch}
            className="w-full rounded bg-blue-600 px-3 py-2 text-white"
          >
            Search
          </button>

          <button
            onClick={handleClear}
            className="w-full rounded bg-gray-500 px-3 py-2 text-white"
          >
            Clear
          </button>
        </div>

        <div className="mb-6">
          <p className="mb-2 font-semibold">City</p>

          <div className="flex max-h-40 flex-col gap-2 overflow-y-auto">
            {uniqueCities.map((city) => (
              <label key={city} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  onChange={() =>
                    handleCheckboxChange(
                      city,
                      selectedCities,
                      setSelectedCities
                    )
                  }
                />
                {city}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-semibold">Category</p>

          <div className="flex max-h-40 flex-col gap-2 overflow-y-auto">
            {uniqueCategories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    handleCheckboxChange(
                      category,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        {loading && <p>Loading...</p>}

        {!loading && filteredItems.length === 0 && <p>No items found.</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((it) => (
            <div key={it._id} className="rounded border border-white/10 p-4">
              <img
                src={`/api/viewMyItem/${it._id.toString()}/image`}
                alt={it.title}
                className="mb-3 h-52 w-full rounded bg-gray-100 object-contain"
              />

              <p className="font-bold">{it.title}</p>

              <p className="text-sm">
                {it.city} • {it.status}
              </p>

              <p className="mb-3 text-sm">{it.resolveStatus}</p>

              {role === "admin" && it.status === "PENDING" && (
                <button
                  onClick={() => handleEdit(it._id)}
                  className="mr-2 rounded bg-green-500 px-3 py-1 text-white"
                >
                  Edit
                </button>
              )}

              {role === "volunteer" && it.resolveStatus === "DUE" && (
                <button
                  onClick={() => handleContactRequest(it._id)}
                  className="rounded bg-blue-500 px-3 py-1 text-white"
                >
                  Send Contact Request
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}