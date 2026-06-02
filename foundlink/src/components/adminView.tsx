"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MyContactRequests from "./requestedItems";

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
  

  const handleEdit = async (id: string) => {
    window.location.href = `/editItem/${id}`;
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

    

    return cityMatch && categoryMatch
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
            : item
        )
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
    <div>
      {/* SEARCH UI */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by title, city, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>

        <button
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {/* CHECKBOX FILTER UI */}
      <div className="border rounded p-4 mb-4">
        <h2 className="font-bold mb-3">Filters</h2>

        <div className="mb-4">
          <p className="font-semibold mb-2">City</p>

          <div className="flex flex-wrap gap-3">
            {uniqueCities.map((city) => (
              <label key={city} className="flex items-center gap-1">
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

        <div className="mb-4">
          <p className="font-semibold mb-2">Category</p>

          <div className="flex flex-wrap gap-3">
            {uniqueCategories.map((category) => (
              <label key={category} className="flex items-center gap-1">
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

      {loading && <p>Loading...</p>}

      {!loading && filteredItems.length === 0 && <p>No items found.</p>}

      {filteredItems.map((it) => (
        <div key={it._id}>
          <div className="border p-3 mb-2">
            <p>{it.title}</p>

            <p className="text-sm">
              {it.city} • {it.status}
            </p>

            <p className="text-sm">{it.resolveStatus}</p>

            <img
              src={`/api/viewMyItem/${it._id.toString()}/image`}
              alt={it.title}
              className="w-40 h-40 object-cover rounded"
            />
          </div>

          {role === "admin" && it.status === "PENDING" && (
            <button
              onClick={() => handleEdit(it._id)}
              className="bg-green-500 text-white px-3 py-1 rounded mr-2"
            >
              Approve
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

      <div>
        <MyContactRequests />
      </div>
    </div>
  );
}