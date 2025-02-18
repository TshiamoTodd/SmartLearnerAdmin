import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-semibold">Smart Learner Admin</h1>
        <ul className="flex gap-6">
          <li>
            <Link href="/signup" className="hover:text-gray-300">
              SIGNUP
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-gray-300">
              LOGIN
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow grid grid-rows-[20px_1fr_20px] items-center justify-items-center justify-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="min-h-52 min-w-80 border border-gray-300 rounded-md p-5 text-center">
          <p className="mb-4">Welcome to Smart Learner Admin Portal</p>
          
          {/* Corrected Link */}
          <Link href="/dashboard">
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
