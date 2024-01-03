import mongoose from "mongoose";

const MessaggeSchema = mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'senderType', // Use dynamic reference based on senderType
    },
    senderType: {
      type: String,
      enum: ['User', 'Rescuer'],
      required: true,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Message = mongoose.model("Message", MessaggeSchema);

export default Message;