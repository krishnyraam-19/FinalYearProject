import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactRequest from "@/models/contactRequest";
import Item from "@/models/item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type ContactRequestBody = {
  itemId: string;
};

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

    const body: ContactRequestBody = await req.json();

    const item = await Item.findById(body.itemId);

    if (!item) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    const existingRequest = await ContactRequest.findOne({
      item: body.itemId,
      requestedBy: session.user.id,
    });

    if (existingRequest) {
      return NextResponse.json(
        { message: "Request already exists" },
        { status: 400 }
      );
    }

    const newRequest = await ContactRequest.create({
      item: body.itemId,
      requestedBy: session.user.id,
      lostOwner: item.createdBy,
    });

    await Item.findByIdAndUpdate(
      body.itemId,
      {
        resolveStatus: "CONTACTREQUESTED",
      }
    );

    return NextResponse.json({
      success: true,
      request: newRequest,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}