import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/item";
import { getServerSession } from "next-auth";
import { authOptions, handler } from "../auth/[...nextauth]/route";

export async function POST() {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // optional admin protection
    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "Admins only" }, { status: 403 });
    }

    const items = await Product.find({
      status: "PENDING",
    }).sort({ createdAt: -1 });

    return NextResponse.json(items);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}