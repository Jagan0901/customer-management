import dbConnect from "@/lib/db";
import Invoice from "@/services/models/Invoice";
import InvoiceLog from "@/services/models/InvoiceLog";

export async function GET(_, { params }) {
  await dbConnect();
  const invoice = await Invoice.findById(params.id).lean();
  return Response.json(invoice);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const updatedData = await req.json();
  const existing = await Invoice.findById(params.id).lean();

  const updated = await Invoice.findByIdAndUpdate(params.id, updatedData, {
    new: true,
  });

  Object.keys(updatedData).forEach((field) => {
    if (String(existing[field]) !== String(updatedData[field])) {
      InvoiceLog.create({
        invoiceId: params.id,
        fieldChanged: field,
        previous: String(existing[field]),
        updated: String(updatedData[field]),
      });
    }
  });

  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await dbConnect();
  await Invoice.findByIdAndDelete(params.id);
  return Response.json({ deleted: true });
}
