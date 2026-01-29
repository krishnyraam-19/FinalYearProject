import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/item";
import EditItemForm from "@/app/editItem/[id]/editItemForm";

export default async function Page(
  props: { params: Promise<{ id: string }> } // Next 16 async params
) {
  const { id } = await props.params;

  await connectToDatabase();
  const item = await Item.findById(id).select("-image.data").lean();

  if (!item) return <p>Item not found</p>;

  const safeItem = {
    ...item,
    _id: item._id.toString(),
    createdBy: item.createdBy?.toString?.() ?? null,
    approvedBy: item.approvedBy?.toString?.() ?? null,
    approvedAt: item.approvedAt ? new Date(item.approvedAt).toISOString() : null,
    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null,
    imageUrl: item.image ? `/api/items/${item._id.toString()}/image` : null,
  };
  console.log("EditItemForm typeof:", typeof EditItemForm);
    console.log("EditItemForm value:", EditItemForm);
    
  return <EditItemForm item={safeItem} />;
}