"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MyContactRequests from "./requestedItems";
import { useRouter } from "next/navigation";

export default function AdminView() {
  const { data: session } = useSession();

  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const role = session?.user?.role;

  const uniqueCities = [...new Set(items.map((i) => i.city).filter(Boolean))];
  const uniqueCategories = [
    ...new Set(items.map((i) => i.category).filter(Boolean)),
  ];

  const router = useRouter();
  const handleEdit = async (id: string) => {
    router.push(`/editItem/${id}`);
  };

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
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

  const fetchItems = async (searchText = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/adminView", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: searchText,
        }),
      });

      if (!response.ok) {
        throw new Error("Unauthorized or failed");
      }

      const data = await response.json();
      setItems(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

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
        throw new Error(data.message);
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId
            ? { ...item, resolveStatus: "CONTACTREQUESTED" }
            : item,
        ),
      );

      alert("Contact request sent successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchItems("");
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="flex gap-6">
      {/* LEFT SIDE FILTER PANEL */}
      <div className="w-72 border rounded p-4 h-fit sticky top-4">
        <h2 className="font-bold text-lg mb-4">Search & Filters</h2>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-3"
        />

        <div className="flex gap-2 mb-6">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-3 py-2 rounded w-full"
          >
            Search
          </button>

          <button
            onClick={handleClear}
            className="bg-gray-500 text-white px-3 py-2 rounded w-full"
          >
            Clear
          </button>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">City</p>

          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {uniqueCities.map((city) => (
              <label key={city} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  onChange={() =>
                    handleCheckboxChange(
                      city,
                      selectedCities,
                      setSelectedCities,
                    )
                  }
                />
                {city}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">Category</p>

          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {uniqueCategories.map((category) => (
              <label key={category} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    handleCheckboxChange(
                      category,
                      selectedCategories,
                      setSelectedCategories,
                    )
                  }
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE ITEMS */}
      <div className="flex-1">
        {loading && <p>Loading...</p>}

        {!loading && filteredItems.length === 0 && <p>No items found.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((it) => (
            <div key={it._id} className="border rounded p-4">
              <img
                src={`/api/viewMyItem/${it._id.toString()}/image`}
                alt={it.title}
                className="w-full h-52 object-contain rounded mb-3 bg-gray-100"
              />

              <p className="font-bold">{it.title}</p>

              <p className="text-sm">
                {it.city} • {it.status}
              </p>

              <p className="text-sm mb-3">{it.resolveStatus}</p>

              {role === "admin" && it.status === "PENDING" && (
                <button
                  onClick={() => handleEdit(it._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
              )}

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
        </div>

        <div className="mt-6">
          <MyContactRequests />
        </div>
      </div>
    </div>
  );
}
