import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactRequest from "@/models/contactRequest";
import Item from "@/models/item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  try {

    await dbConnect();

    const session = await getServerSession(authOptions);

    // only admin
    if (
      !session?.user?.id ||
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        { message: "Admin access only" },
        { status: 403 }
      );
    }

    // find request
    const { id } = await context.params;
    const request = await ContactRequest.findById(
      id
    );

    if (!request) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    // approve request
    request.status = "APPROVED";

    request.approvedBy = session.user.id;

    request.approvedAt = new Date();

    await request.save();

    // update item resolve status
    // await Item.findByIdAndUpdate(
    //   request.item,
    //   {
    //     $set: {
    //       status: "APPROVED",
    //     },
    //   }
    // );

    return NextResponse.json({
      success: true,
      message: "Request approved successfully",
      request,
    });

  } catch (error: unknown) {

    console.log("APPROVE REQUEST ERROR:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}