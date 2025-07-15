import dbConnect from "@/lib/db";
import Customer from "@/services/models/Customer";
import Invoice from "@/services/models/Invoice";

export async function GET() {
  await dbConnect();
  const customers = await Customer.countDocuments();
  const invoices = await Invoice.find().lean();

  const outstanding = invoices
    .filter((i) => i.status !== "Paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const revenue = invoices.reduce((sum, i) => sum + i.amount, 0);

  return Response.json({ totalCustomers: customers, outstanding, revenue });
}
