import mongoose from "mongoose";

const conversationSchema = new mongoose.schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
  },
  { timestamps: true } // createdAt: , updatedAt:
);

const Conversation = mongoose.model("conversation", conversationSchema);

export default conversationSchema;
