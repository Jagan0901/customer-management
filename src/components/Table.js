// "use client";
import { useState } from "react";


export const Table = ({ data, onRowClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const currentRows = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="pt-5">
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">ExternalCustomerId</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(item._id)}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3 cursor-pointer">{item.name}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td
                  className={`px-4 py-3`}
                >
                  {item.externalCustomerId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Prev
        </button>
        <span>
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
