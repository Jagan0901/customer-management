import dbConnect from "@/lib/db";
import Customer from "@/services/models/Customer";
import Invoice from "@/services/models/Invoice";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const customer = await Customer.findById(id);
  const invoices = await Invoice.find({ customerId: id });

  return Response.json({ customer, invoices });
}
