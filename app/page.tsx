import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="min-h-52 min-w-80 border border-gray-300 rounded-md p-5">
        <p>Welcome to Smart Learner Admin Port</p>
      </div>
    </div>
  );
}
