import connectToDatabase from "@/lib/mongodb";
import item from "@/models/item";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, handler } from "../auth/[...nextauth]/route";





export async function POST(request: any) {
  const session = await getServerSession(authOptions);


  const formData = await request.formData();

  const category = formData.get("category");
  const title = formData.get("title");
  const city = formData.get("city");
  const type = formData.get("type");
  const description = formData.get("description");
  const image = formData.get("image"); // File object (if uploaded)
  

  console.log({ category, title, city, type, description, image, session });

  //   return NextResponse.json({ ok: true });

  let imageObj = undefined;

  if (image && typeof image === "object" && "arrayBuffer" in image) {
    // ✅ File -> Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Optional size guard (recommended)
    const MAX_BYTES = 2 * 1024 * 1024; // 2MB
    if (buffer.length > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, message: "Image too large. Please upload under 2MB." },
        { status: 413 },
      );
    }

    imageObj = {
      data: buffer,
      contentType: image.type || "application/octet-stream",
      fileName: image.name || "upload",
      size: buffer.length,
    };
  }

  await connectToDatabase();

  const newItem = new item({
    category,
    title,
    city,
    type,
    description,
    image: imageObj,
    createdBy: session?.user?.id,
  });

  try {
    await newItem.save();
    return NextResponse.json("Item is saved successfully", { status: 200 });
  } catch (err: any) {
    return NextResponse.json(err, { status: 500 });
  }
}
function auth() {
    throw new Error("Function not implemented.");
}

