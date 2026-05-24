import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Item from "@/models/item";

export async function GET() {
  try {
    await dbConnect();

    const totalLost = await Item.countDocuments({ type: "lost" });
    const totalFound = await Item.countDocuments({ type: "found" });

    const pendingPosts = await Item.countDocuments({ status: "PENDING" });
    const approvedPosts = await Item.countDocuments({ status: "APPROVED" });
    const rejectedPosts = await Item.countDocuments({ status: "REJECTED" });

    const data = {
      cards: {
        totalLost,  
        totalFound,
        pendingPosts,
        approvedPosts,
      },
      statusData: [
        { name: "Pending", value: pendingPosts },
        { name: "Approved", value: approvedPosts },
        { name: "Rejected", value: rejectedPosts },
      ],
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Dashboard data loading failed", error: error.message },
      { status: 500 }
    );
  }
}