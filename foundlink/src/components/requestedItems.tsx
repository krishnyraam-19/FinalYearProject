"use client";

import { useEffect, useState } from "react";

export default function MyContactRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [error, setError] = useState("");

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

  // initial load
  fetchRequests();

  // auto refresh every 5 seconds
  const interval = setInterval(fetchRequests, 5000);

  return () => clearInterval(interval);

}, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Contact Requests</h1>

      {requests.map((req) => (
        <div key={req._id} className="border p-4 mb-3 rounded">
          <h2 className="font-semibold">{req.item?.title}</h2>

          <p>{req.item?.city}</p>

          <p>
            Status:{" "}
            <span className="font-bold">
              {req.status}
            </span>
          </p>

          {req.status === "PENDING" && (
            <p className="text-yellow-600">
              Waiting for admin approval
            </p>
          )}

          {req.status === "APPROVED" && (
            <div className="mt-3 border-t pt-3">
              <h3 className="font-semibold">Lost Owner Contact Details</h3>

              <p>Name: {req.lostOwner?.fname} {req.lostOwner?.lname}</p>
              <p>Email: {req.lostOwner?.email}</p>
              <p>Phone: {req.lostOwner?.phone}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}