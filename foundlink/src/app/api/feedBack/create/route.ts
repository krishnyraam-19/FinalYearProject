import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/feedback";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { itemId, receiverId, rating, comment } = body;

    if (!itemId || !receiverId || !rating) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingFeedback = await Feedback.findOne({
      item: itemId,
      providerId: session.user.id,
    });

    if (existingFeedback) {
      return NextResponse.json(
        { message: "Feedback already submitted for this item" },
        { status: 400 }
      );
    }

    const feedback = await Feedback.create({
      item: itemId,
      receiverId,
      providerId: session.user.id,
      rating,
      comment,
    });

    return NextResponse.json({
      success: true,
      message: "Feedback saved successfully",
      feedback,
    });
  } catch (error: unknown) {
    console.log("FEEDBACK CREATE ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json({ message }, { status: 500 });
  }
}