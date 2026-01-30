import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/item";


// import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ ok: true, id: params.id });
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
  
) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    console.log("id",id);

    const formData = await req.formData();

    const title = formData.get("title");
    const city = formData.get("city");
    const status = formData.get("status");
    const image = formData.get("image"); // File | null

    const updateData: any = {
      ...(title && { title }),
      ...(city && { city }),
      ...(status && { status }),
    };

    // If image exists, convert to Buffer
    if (image && image instanceof File) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      updateData.image = {
        data: buffer,
        contentType: image.type,
      };
    }
    console.log(id);
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update item" },
      { status: 500 }
    );
  }
}