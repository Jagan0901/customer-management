// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Table } from "@/components/Table";

// export default function CustomerPage() {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState({});
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     fetch(`/api/customers?id=${id}`)
//       .then((res) => res.json())
//       .then(({ customer, invoices }) => {
//         setCustomer(customer);
//         const formatted = invoices.map((inv) => ({
//           name: inv.externalInvoiceId,
//           amount: inv.amount,
//           status: inv.status,
//           due: new Date(inv.dueDate).toLocaleDateString(),
//         }));
//         setInvoices(formatted);
//       });
//   }, [id]);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Customer: {customer.name}</h1>
//       <p className="text-gray-600">{customer.email}</p>
//       <p className="text-gray-600">External ID: {customer.externalCustomerId}</p>

//       <div>
//         <p className="text-xl mt-6 mb-2">Invoices</p>
//         <Table data={invoices} />
//       </div>
//     </div>
//   );
// }

"use client"
import InvoiceForm from "@/components/InvoiceForm";
import { InvoiceTable } from "@/components/InvoiceTable";
import { Navbar } from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchData = () => {
    fetch(`/api/customers?id=${id}`)
      .then((res) => res.json())
      .then(({ customer, invoices }) => {
        setCustomer(customer);
        setInvoices(invoices);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async (invoiceId) => {
    await fetch(`/api/invoices/${invoiceId}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Customer: {customer.name}</h1>
        <p className="text-gray-600 mb-4">{customer.email}</p>

        <InvoiceTable
          data={invoices}
          onEdit={(invoice) => setEditing(invoice)}
          onDelete={(id) => handleDelete(id)}
        />

        <InvoiceForm
          customerId={customer._id}
          externalCustomerId={customer.externalCustomerId}
          existing={editing}
          onSuccess={() => {
            setEditing(null);
            fetchData();
          }}
        />
      </div>
    </>
  );
}

