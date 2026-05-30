import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
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

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const item = await Item.findById(id);

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    if (item.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    item.resolveStatus = "RESOLVED";
    await item.save();

    return NextResponse.json({
      success: true,
      message: "Item marked as resolved",
      item,
    });
  } catch (error: unknown) {
    console.log("RESOLVE ITEM ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json({ message }, { status: 500 });
  }
}