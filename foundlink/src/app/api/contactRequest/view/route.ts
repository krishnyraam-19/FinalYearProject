import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CntRequest from "@/models/contactRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    let filter = {};

    if (session.user.role === "admin") {
      filter = {
        status: { $in: ["PENDING", "APPROVED"] },
      };
    } else if (session.user.role === "volunteer") {
      filter = {
        requestedBy: session.user.id,
        status: "PENDING",
      };
    } else {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const requests = await CntRequest.find(filter)
      .populate("item", "title city status")
      .populate("requestedBy", "fname lname email phone role")
      .populate("lostOwner", "fname lname email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error: unknown) {
    console.log("CONTACT REQUEST VIEW ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}