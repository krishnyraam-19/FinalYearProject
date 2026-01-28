import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/item";
// import { auth } from "@/auth"; // if using NextAuth v5
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export async function POST() {
    
  const session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const products = await Product.find({ createdBy: session.user.id }).sort({ createdAt: -1 });
  return NextResponse.json(products);
}