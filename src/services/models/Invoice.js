import mongoose from "mongoose";
const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    externalCustomerId: String,
    externalInvoiceId: String,
    amount: Number,
    status: String, // 'Paid', 'Pending', 'Past Due'
    dueDate: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", invoiceSchema);
