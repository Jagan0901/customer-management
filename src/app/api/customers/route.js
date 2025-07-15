import dbConnect from "@/lib/db";
import Customer from "@/services/models/Customer";
import Invoice from "@/services/models/Invoice";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const customer = await Customer.findById(id).lean();
    const invoices = await Invoice.find({ customerId: id }).lean();
    return Response.json({ customer, invoices });
  }

  const customers = await Customer.find().lean();
  return Response.json(customers);
}
