import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="h-screen snap-start flex items-center justify-center bg-green-500 text-white text-6xl border-4 border-black">1</div>
      <div className="h-screen snap-start flex items-center justify-center bg-red-500 text-white text-6xl border-4 border-black">2</div>
      <div className="h-screen snap-start flex items-center justify-center bg-red-500 text-white text-6xl border-4 border-black">3</div>
      <div className="h-screen snap-start flex items-center justify-center bg-red-500 text-white text-6xl border-4 border-black">4</div>
    </main>
  );
}
