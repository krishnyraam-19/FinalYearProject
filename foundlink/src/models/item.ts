import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    category: String,
    title: String,
    city: String,
    type: String,
    description: String,
    image: {
      data: Buffer,         // binary
      contentType: String,  // "image/jpeg", "image/png"
      fileName: String,     // optional
      size: Number,         // optional
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // approval workflow
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    approvedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model("Item", itemSchema);