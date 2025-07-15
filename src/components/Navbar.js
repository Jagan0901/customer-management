"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session } = useSession();


  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
          Dashboard
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
          >
            <Image
              src="https://i.pravatar.cc/150?img=3"
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
              <button
                onClick={() => setShowModal(true)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                My Profile
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })} cursor-pointer
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              User Profile
            </h2>
            {session?.user ? (
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Name:</strong>{" "}
                  {session.user.name || "No name provided"}
                </p>
                <p>
                  <strong>Email:</strong> {session.user.email}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No user is signed in.</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
