"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table } from "./Table";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((c) => ({
          _id: c._id,
          name: c.name,
          email: c.email,
          externalCustomerId: c.externalCustomerId,
          // due: "N/A",
        }));
        setCustomers(formatted);
      });
  }, []);

  const handleRowClick = (id) => router.push(`/customer/${id}`);

  return (
    <div className="p-5">
      <p className="text-2xl mb-2">Customers</p>
      <Table data={customers} onRowClick={handleRowClick} />
    </div>
  );
};

