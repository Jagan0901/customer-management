"use client";
import { useEffect, useState } from "react";

export const DashboardView = () => {
  const [stats, setStats] = useState({ totalCustomers: 0, outstanding: 0, revenue: 0 });

  useEffect(() => {
    fetch("/api/dashboard-stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  const Card = ({ label, value }) => (
    <div className="border-2 border-gray-200 py-5 ps-2 h-30 w-50 rounded text-center">
      <p className="text-sm">{label}</p>
      <p className="text-xl mt-1 font-semibold">{value}</p>
    </div>
  );

  return (
    <div className="p-5 flex justify-between">
      <Card label="Total Customers" value={stats.totalCustomers} />
      <Card label="Outstanding Invoices" value={`₹${stats.outstanding}`} />
      <Card label="Revenue" value={`₹${stats.revenue}`} />
    </div>
  );
};

