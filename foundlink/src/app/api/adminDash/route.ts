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
    const rejectedPosts = await Item.countDocuments({ status: "REJECTED" }) || 6;

    const monthlyResult = await Item.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyData = monthNames.slice(1).map((month, index) => {
      const monthNumber = index + 1;

      const lostData = monthlyResult.find(
        (item) => item._id.month === monthNumber && item._id.type === "lost"
      );

      const foundData = monthlyResult.find(
        (item) => item._id.month === monthNumber && item._id.type === "found"
      );

      return {
        month,
        lost: lostData ? lostData.count : 0,
        found: foundData ? foundData.count : 0,
      };
    });

    const data = {
      cards: {
        totalLost,  
        totalFound,
        pendingPosts,
        approvedPosts,
        rejectedPosts
      },
      statusData: [
        { name: "Pending", value: pendingPosts },
        { name: "Approved", value: approvedPosts },
        { name: "Rejected", value: rejectedPosts },
      ],
        monthlyData,

    };

    

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Dashboard data loading failed", error: error.message },
      { status: 500 }
    );
  }
}