import dbConnect from "@/lib/db";
import Invoice from "@/services/models/Invoice";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const invoice = await Invoice.create(body);
  return Response.json(invoice);
}
