"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Sidebar */}
      <div
        className={`fixed sm:relative top-0 left-0 h-100 w-40 bg-blue-900 text-white p-5 space-y-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">DASHBOARD</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="sm:hidden text-white"
          >
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/subjects" className="block hover:bg-red-700 p-2 rounded">
                SUBJECTS
              </Link>
            </li>
            <li>
              <Link href="/subjectvideos" className="block hover:bg-red-700 p-2 rounded">
                SUBJECT VIDEOS
              </Link>
            </li>
            <li>
              <Link href="/users" className="block hover:bg-red-700 p-2 rounded">
                USERS
              </Link>
            </li>
            <li>
              <Link href="/pdf" className="block hover:bg-red-700 p-2 rounded">
                PDF
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden bg-gray-900 text-white p-2 rounded-md mb-4"
        >
          {isOpen ? <X size={10} /> : <Menu size={5} />}
        </button>

        
        <p className="mt-2 text-gray-600">Manage your admin panel efficiently.</p>
      </div>
    </div>
  );
}
