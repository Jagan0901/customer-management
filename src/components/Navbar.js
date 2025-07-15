"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link href={"/dashboard"} className="text-2xl font-bold text-gray-800 cursor-pointer">Dashboard</Link>

      <div
        className="relative"
        ref={dropdownRef}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
        >
          <Image
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            width={40}
            height={40}
            className="object-cover w-full h-full cursor-pointer"
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
            <button
              className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            //   onClick={() => alert("Logging out...")}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
