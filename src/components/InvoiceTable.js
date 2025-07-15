"use client";
import { useState } from "react";

export const InvoiceTable = ({ data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="pt-5">
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Invoice ID</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((invoice, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="px-4 py-3">{invoice.externalInvoiceId}</td>
                <td className="px-4 py-3">₹{invoice.amount}</td>
                <td
                  className={`px-4 py-3 ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : invoice.status === "Past Due"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {invoice.status}
                </td>
                <td className="px-4 py-3">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => onEdit(invoice)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(invoice._id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
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
          className="px-3 py-1 border border-gray-300 cursor-pointer rounded hover:bg-gray-100"
          disabled={currentPage === 1}
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
          className="px-3 py-1 border border-gray-300 cursor-pointer rounded hover:bg-gray-100"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
