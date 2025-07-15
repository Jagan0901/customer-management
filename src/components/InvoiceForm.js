"use client";
import { useState } from "react";

export default function InvoiceForm({
  customerId,
  externalCustomerId,
  onSuccess,
  existing,
}) {
  const [formData, setFormData] = useState(
    existing || {
      externalInvoiceId: "",
      amount: "",
      status: "Pending",
      dueDate: "",
    }
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      customerId,
      externalCustomerId,
    };

    const method = existing ? "PUT" : "POST";
    const url = existing ? `/api/invoices/${existing._id}` : "/api/invoices";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess();
      setFormData({
        externalInvoiceId: "",
        amount: "",
        status: "Pending",
        dueDate: "",
      });
    }
  };

  return (
    <form className="border p-4 rounded mt-4 space-y-3" onSubmit={handleSubmit}>
      <p className="text-lg font-medium">
        {existing ? "Edit Invoice" : "Add Invoice"}
      </p>
      <input
        type="text"
        name="externalInvoiceId"
        placeholder="Invoice ID"
        value={formData.externalInvoiceId}
        onChange={handleChange}
        required
        className="w-full border px-2 py-1 rounded"
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        className="w-full border px-2 py-1 rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border px-2 py-1 rounded"
      >
        <option>Pending</option>
        <option>Paid</option>
        <option>Past Due</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
        className="w-full border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 cursor-pointer"
      >
        {existing ? "Update" : "Create"}
      </button>
    </form>
  );
}
