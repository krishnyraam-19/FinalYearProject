import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/feedback";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    await dbConnect();

    const { userId } = await context.params;
    console.log(userId);
    const feedbacks = await Feedback.find({
      receiverId: userId,
    });

    const totalReviews = feedbacks.length;
    console.log(totalReviews);
    const averageRating =
      totalReviews > 0
        ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalReviews
        : 0;

    let badge = "No Badge";

    if (averageRating >= 4.5) badge = "Gold Helper";
    else if (averageRating >= 4.0) badge = "Silver Helper";
    else if (averageRating >= 3.0) badge = "Trusted Helper";

    return NextResponse.json({
      success: true,
      userId,
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      badge,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}