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
          throw new Error(
            result.message || "Failed to fetch rating"
          );
        }

        setData(result);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchRating();
  }, [userId]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
        Loading rating...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="mb-4 text-center">
        <p className="inline-block rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1 text-sm font-bold text-emerald-300">
          Volunteer Recognition
        </p>
      </div>

      <div className="text-center">
        <div className="mb-3 text-4xl">
          {"⭐".repeat(Math.round(data.averageRating))}
        </div>

        <h3 className="text-3xl font-black text-white">
          {data.averageRating.toFixed(1)}
          <span className="text-lg text-slate-400"> / 5</span>
        </h3>

        <p className="mt-2 text-slate-300">
          Based on {data.totalReviews} review(s)
        </p>

        <div className="mt-5">
          <span
            className={`inline-block rounded-full px-5 py-2 text-sm font-black ${
              data.badge === "Gold Volunteer"
                ? "bg-yellow-500/20 text-yellow-300"
                : data.badge === "Silver Volunteer"
                ? "bg-slate-400/20 text-slate-300"
                : data.badge === "Bronze Volunteer"
                ? "bg-orange-500/20 text-orange-300"
                : "bg-emerald-500/20 text-emerald-300"
            }`}
          >
            🏅 {data.badge}
          </span>
        </div>
      </div>
    </div>
  );
}