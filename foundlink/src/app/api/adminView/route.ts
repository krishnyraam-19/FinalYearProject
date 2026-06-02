import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/item";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {

  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectToDatabase();

  // get search text from frontend
  const body = await req.json();
  const search = body.search || "";

  let filter: any = {};

  // volunteers should not see pending posts
  if (session.user.role === "volunteer") {
    filter.status = { $ne: "PENDING" };
  }

  // normal users can only see approved posts
  else if (session.user.role === "user") {
    filter.status = "APPROVED";
  }

  // admin can see everything
  else if (session.user.role === "admin") {
    filter = {};
  }

  // search function
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i"
        }
      },
      {
        description: {
          $regex: search,
          $options: "i"
        }
      },
      {
        city: {
          $regex: search,
          $options: "i"
        }
      },
      {
        category: {
          $regex: search,
          $options: "i"
        }
      }
    ];
  }

  const products = await Product.find(filter)
    .sort({ createdAt: -1 });

  return NextResponse.json(products);
}