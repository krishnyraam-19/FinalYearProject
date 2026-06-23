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
        const selectedItem = data.find((it: any) => it._id === itemId);

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

    try {
      if (!requestUserId) {
        alert("Requester not found");
        return;
      }

      if (rating === 0) {
        alert("Please select a rating");
        return;
      }

      const response = await fetch("/api/feedBack/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          receiverId: requestUserId,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Feedback submitted successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (error) {
    return (
      <section className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
          {error}
        </p>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <p className="text-slate-300">Loading...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            Feedback Center
          </p>

          <h1 className="mt-5 text-5xl font-black">
            Submit Feedback
          </h1>

          <p className="mt-3 text-slate-300">
            Rate the volunteer or requester who helped complete this case.
          </p>
        </div>

        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="mb-5 text-2xl font-black text-emerald-300">
            Item Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <p className="rounded-2xl bg-slate-900/70 p-4">
              <span className="font-bold text-white">Title:</span>{" "}
              <span className="text-slate-300">{item.title}</span>
            </p>

            <p className="rounded-2xl bg-slate-900/70 p-4">
              <span className="font-bold text-white">City:</span>{" "}
              <span className="text-slate-300">{item.city}</span>
            </p>

            <p className="rounded-2xl bg-slate-900/70 p-4">
              <span className="font-bold text-white">Status:</span>{" "}
              <span className="text-slate-300">{item.status}</span>
            </p>

            <p className="rounded-2xl bg-slate-900/70 p-4">
              <span className="font-bold text-white">Resolve Status:</span>{" "}
              <span className="text-emerald-300">{item.resolveStatus}</span>
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-900/70 p-4">
            <p className="font-bold text-white">Description:</p>
            <p className="mt-2 text-slate-300">{item.description}</p>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
          <h2 className="mb-5 text-2xl font-black text-emerald-300">
            Requester Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* <p className="break-all rounded-2xl bg-slate-900/70 p-4">
              <span className="font-bold text-white">Requester ID:</span>{" "}
              <span className="text-slate-300">{requestUserId}</span>
            </p> */}

            <p className="rounded-2xl bg-slate-900/70 p-4">
              <span className="font-bold text-white">Name:</span>{" "}
              <span className="text-slate-300">
                {requestUser?.fname} {requestUser?.lname}
              </span>
            </p>

            <p className="break-all rounded-2xl bg-slate-900/70 p-4">
              <span className="font-bold text-white">Email:</span>{" "}
              <span className="text-slate-300">{requestUser?.email}</span>
            </p>

            <p className="rounded-2xl bg-slate-900/70 p-4">
              <span className="font-bold text-white">Phone:</span>{" "}
              <span className="text-slate-300">{requestUser?.phone}</span>
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div>
            <label className="mb-3 block font-bold text-slate-300">
              Rating
            </label>

            <div className="flex gap-3 text-4xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition hover:scale-110 ${
                    star <= rating
                      ? "text-yellow-300"
                      : "text-slate-500"
                  }`}
                >
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-3 block font-bold text-slate-300">
              Comment
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              rows={4}
              placeholder="Write your feedback..."
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-emerald-400 px-4 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}