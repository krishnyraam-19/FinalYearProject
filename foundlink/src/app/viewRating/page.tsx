"use client";

import { useSession } from "next-auth/react";
import RatingBadge from "@/components/ratingBadge";

export default function viewRating() {

  const { data: session } = useSession();

  console.log("SESSION:", session);

  const userId = session?.user?.id;

  console.log("USER ID:", userId);

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-4">
        My Rating
      </h1>

      <RatingBadge userId={userId} />

    </div>
  );
}