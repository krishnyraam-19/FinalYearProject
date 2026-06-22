import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/item";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if ((session.user as any).role !== "admin") {
      return NextResponse.json(
        { message: "Admins only" },
        { status: 403 }
      );
    }

    const items = await Product.find({
      status: "PENDING",
    }).sort({ createdAt: -1 });

    return NextResponse.json(items);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}