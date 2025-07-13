import dbConnect from "@/lib/db";
import { User } from "@/services/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await dbConnect();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return new Response(JSON.stringify({ error: "Email already in use" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
