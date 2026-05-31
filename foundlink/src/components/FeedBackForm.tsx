"use client";

import { useEffect, useState } from "react";

type Props = {
  itemId: string;
};

export default function FeedbackForm({ itemId }: Props) {
  const [item, setItem] = useState<any>(null);
  const [requestUserId, setRequestUserId] = useState("");
  const [requestUser, setRequestUser] = useState<any>(null);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch("/api/viewMyItem", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }

        const data = await response.json();

        const selectedItem = data.find(
          (it: any) => it._id === itemId
        );

        setItem(selectedItem);

        const reqResponse = await fetch("/api/contactRequest/view");

        if (!reqResponse.ok) {
          throw new Error("Failed to fetch contact request");
        }

        const reqData = await reqResponse.json();

        const matchedRequest = reqData.requests?.find(
          (req: any) => req.item?._id === itemId
        );

        if (matchedRequest) {
          setRequestUserId(matchedRequest.requestedBy?._id);
          setRequestUser(matchedRequest.requestedBy);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      itemId,
      requestUserId,
      rating,
      comment,
    });

    alert("Feedback submitted");
  };

  if (error) return <p>{error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div className="p-5 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">
        Feedback Form
      </h1>

      <div className="border p-4 rounded mb-4">
        <p><strong>Title:</strong> {item.title}</p>
        <p><strong>City:</strong> {item.city}</p>
        <p><strong>Status:</strong> {item.status}</p>
        <p><strong>Resolve Status:</strong> {item.resolveStatus}</p>
        <p><strong>Description:</strong> {item.description}</p>

        <hr className="my-3" />

        <p><strong>Requester User ID:</strong> {requestUserId}</p>
        <p><strong>Requester Name:</strong> {requestUser?.fname} {requestUser?.lname}</p>
        <p><strong>Requester Email:</strong> {requestUser?.email}</p>
        <p><strong>Requester Phone:</strong> {requestUser?.phone}</p>
      </div>

      <form onSubmit={handleSubmit} className="border p-4 rounded space-y-4">
        <div>
          <label className="block font-semibold mb-2">
            Rating
          </label>

          <div className="flex gap-2 text-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
              >
                {star <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Comment
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border w-full p-2 rounded"
            rows={4}
            placeholder="Write your feedback..."
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}