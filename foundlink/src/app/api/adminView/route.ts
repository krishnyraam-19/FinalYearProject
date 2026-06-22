import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/item";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body = await req.json();
    const search = body.search || "";

    let filter: any = {};

    if (user.role === "volunteer") {
      filter.status = { $ne: "PENDING" };
    } else if (user.role === "user") {
      filter.status = "APPROVED";
    } else if (user.role === "admin") {
      filter = {};
    } else {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error("ADMIN VIEW ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}