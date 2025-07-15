// import dbConnect from "@/lib/db";
// import Customer from "@/services/models/Customer";

// export async function GET() {
//   await dbConnect();
//   const customers = await Customer.find().lean();
//   return Response.json(customers);
// }

// export async function POST(req) {
//   await dbConnect();
//   const body = await req.json();
//   const { name, email, externalCustomerId } = body;

//   if (!name || !email || !externalCustomerId) {
//     return Response.json(
//       { success: false, error: "Missing required fields" },
//       { status: 400 }
//     );
//   }

//   try {
//     const customer = await Customer.create({ name, email, externalCustomerId });
//     return Response.json({ success: true, customer });
//   } catch (err) {
//     return Response.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }

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
