import MyItem from "@/components/myItem";

export default function ViewItemPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header Section */}
      <div className="border-b border-white/10 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-4xl font-black text-white">
            Lost & Found Items
          </h1>

          <p className="mt-2 text-slate-400">
            Browse all approved lost and found items published by the
            administrators.
          </p>
        </div>
      </div>

      {/* Items Section */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <MyItem />
      </div>
    </div>
  );
}