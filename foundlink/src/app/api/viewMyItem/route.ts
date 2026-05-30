import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/item";
// import { auth } from "@/auth"; // if using NextAuth v5
import { getServerSession } from "next-auth";
import ContactRequest from "@/models/contactRequest";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export async function POST() {
    
  const session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  var type;
  if(session.user.role=="volunteer"){
    type="found";
  }else type="lost";
  const products = await Product.find({ createdBy: session.user.id, type:type}).sort({ createdAt: -1 });
  const updatedProducts = await Promise.all(

    products.map(async (product) => {

      const requests = await ContactRequest.find({
        item: product._id
      })
      .populate(
        "requestedBy",
        "fname lname email phone"
      );

      return {
        ...product.toObject(),

        requesters: requests.map((req) => ({
          requestId: req._id,
          userId: req.requestedBy?._id,
          requester: req.requestedBy,
          status: req.status,
        }))
      };
    })

  );
  return NextResponse.json(updatedProducts);
}