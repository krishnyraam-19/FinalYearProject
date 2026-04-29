import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectToDatabase();

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updatedItem = await Product.findByIdAndUpdate(
      id,
      { $set: { status: "APPROVED" } },
      { new: true }
    );

    console.log("UPDATED ITEM:", updatedItem);

    if (!updatedItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Item Approved",
      item: updatedItem,
    });
  } catch (error) {
    console.log("APPROVAL ERROR:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}