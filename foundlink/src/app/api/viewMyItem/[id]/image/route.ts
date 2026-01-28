import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/item";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await connectToDatabase();

  const item = await Item.findById(id).select("image");
  if (!item?.image?.data) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(item.image.data, {
    headers: {
      "Content-Type": item.image.contentType || "image/jpeg",
      "Cache-Control": "no-store",
    },
  });
}
