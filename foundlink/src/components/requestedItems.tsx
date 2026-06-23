"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MyContactRequests() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  const [requests, setRequests] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleApproveRequest = async (requestId: string) => {
    try {
      const response = await fetch(`/api/contactRequest/approve/${requestId}`, {
        method: "PUT",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status: "APPROVED" } : req
        )
      );

      alert("Request approved successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/contactRequest/view");

        if (!res.ok) {
          throw new Error("Failed to load requests");
        }

        const data = await res.json();
        setRequests(data.requests);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchRequests();

    const interval = setInterval(fetchRequests, 5000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        {error}
      </div>
    );
  }

  return (
  <section className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="mb-10 text-center">
        {/* <p className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
          Contact Request Center
        </p> */}

        <h1 className="mt-5 text-4xl font-black md:text-6xl">
          Contact Requests
        </h1>

        <p className="mt-3 text-slate-300">
          View and manage all contact requests related to lost items.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
          No contact requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {requests.map((req) => (
            <div
              key={req._id}
              className="flex min-h-[360px] flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-emerald-400/30"
            >
              <div className="mb-4">
                <h2 className="break-words text-2xl font-black text-white">
                  {req.item?.title}
                </h2>

                <span
                  className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-bold ${
                    req.status === "APPROVED"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              <p className="text-slate-300">
                📍 {req.item?.city}
              </p>

              {req.status === "PENDING" && (
                <div className="mt-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-yellow-300">
                  Waiting for admin approval
                
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <h3 className="mb-3 text-lg font-black text-emerald-300">
                    Requester Details
                  </h3>

                  <div className="space-y-2">
                    <p className="break-words">
                      <span className="font-bold">Name:</span>{" "}
                      {req.requestedBy?.fname} {req.requestedBy?.lname}
                    </p>

                    <p className="break-all">
                      <span className="font-bold">Email:</span>{" "}
                      {req.requestedBy?.email}
                    </p>

                    <p>
                      <span className="font-bold">Phone:</span>{" "}
                      {req.requestedBy?.phone}
                    </p>
                  </div>
                </div>
                </div>
              )}

              {req.status === "APPROVED" && (
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <h3 className="mb-3 text-lg font-black text-emerald-300">
                    Lost Owner Details
                  </h3>

                  <div className="space-y-2">
                    <p className="break-words">
                      <span className="font-bold">Name:</span>{" "}
                      {req.lostOwner?.fname} {req.lostOwner?.lname}
                    </p>

                    <p className="break-all">
                      <span className="font-bold">Email:</span>{" "}
                      {req.lostOwner?.email}
                    </p>

                    <p>
                      <span className="font-bold">Phone:</span>{" "}
                      {req.lostOwner?.phone}
                    </p>
                  </div>
                </div>
              )}

              {role === "admin" && req.status === "PENDING" && (
                <button
                  onClick={() => handleApproveRequest(req._id)}
                  className="mt-auto rounded-xl bg-emerald-400 px-4 py-3 font-black text-slate-950 hover:bg-emerald-300"
                >
                  Approve Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);
}