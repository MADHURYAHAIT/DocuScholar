import mongoose from "mongoose";
const messageSchema = mongoose.Schema(
  {
    email: {
      type: String,
      ref: "User",
    },
    text: {
      type: String,
    },
    bot:{
      type:Boolean,
    },
  },
  {
    timestamps: true,
  }
);
const messages = mongoose.model("Message", messageSchema);
export default messages;