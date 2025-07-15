import mongoose from "mongoose";
const { Schema } = mongoose;

const logSchema = new Schema({
  invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice" },
  fieldChanged: String,
  previous: String,
  updated: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.InvoiceLog ||
  mongoose.model("InvoiceLog", logSchema);
