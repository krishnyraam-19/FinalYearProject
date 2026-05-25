import mongoose from "mongoose";


const contactRequestSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },

  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // volunteer/finder
    required: true
  },

  lostOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // person who lost the item
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },

  adminNote: {
    type: String
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // admin
  },

  approvedAt: {
    type: Date
  }

}, { timestamps: true });

export default mongoose.models.ContactRequest ||
mongoose.model("ContactRequest", contactRequestSchema);