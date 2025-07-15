import mongoose from "mongoose";
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    externalCustomerId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);
