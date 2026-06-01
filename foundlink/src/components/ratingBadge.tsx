"use client";

import { useEffect, useState } from "react";

type Props = {
  userId: string;
};

export default function RatingBadge({ userId }: Props) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found");
      return;
    }

    const fetchRating = async () => {
      try {
        const res = await fetch(`/api/feedBack/rating/${userId}`);

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch rating");
        }

        setData(result);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchRating();
  }, [userId]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="border p-4 rounded">
      <p>Rating: {"★".repeat(Math.round(data.averageRating))}</p>
      <p>Average: {data.averageRating}/5</p>
      <p>Total Reviews: {data.totalReviews}</p>
      <p>Badge: {data.badge}</p>
    </div>
  );
}