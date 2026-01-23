import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request: Request) {
  try {
    const { fname, lname, email, phone, password } = await request.json();

    if (!fname || !lname || !email || !phone || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fname,
      lname,
      email,
      phone,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}