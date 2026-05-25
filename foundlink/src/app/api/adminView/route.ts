import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/item";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST() {

  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectToDatabase();

  let filter = {};

  // volunteers should not see pending posts
  if (session.user.role === "volunteer") {
    filter = {
      status: { $ne: "PENDING" }
    };
  }

  // normal users can only see approved posts
  else if (session.user.role === "user") {
    filter = {
      status: "APPROVED"
    };
  }

  // admin can see everything
  else if (session.user.role === "admin") {
    filter = {};
  }

  const products = await Product.find(filter)
    .sort({ createdAt: -1 });

  return NextResponse.json(products);
}