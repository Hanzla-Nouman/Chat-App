import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const converstaion = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!converstaion) {
      converstaion = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      converstaion.messages.push(newMessage._id);
    }

    // SOCKET.IO functionality will go here

    // await converstaion.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([converstaion.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // To get no reference but actual messages

    if (!conversation) res.status(200).json([]);

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get message controller", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
