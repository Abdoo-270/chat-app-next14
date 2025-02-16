"use server"
import { Types } from "mongoose";
import {auth, signIn, signOut} from "../auth";
import { v2 as cloudinary } from "cloudinary";
import { connectToMongoDB } from "./db";
import Message, { IMessageDocument }  from "@/models/messageModel";
import Chat,  { IChatDocument } from "@/models/chatModel";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default async function authAction() {
    "use server";
    await signIn("github")
  }
export async function logoutAction() {
	await signOut();
}

export const sendMessageAction = async (receiverId: string, content: string, messageType: "image" | "text") => {
	noStore();
	try {
		const session = await auth();
		if (!session) return;
		await connectToMongoDB();
		const senderId = session.user._id;

		let uploadedResponse;
		if (messageType === "image") {
			uploadedResponse = await cloudinary.uploader.upload(content);
		}

		const newMessage: IMessageDocument = await Message.create({
			sender: senderId,
			receiver: receiverId,
			content: uploadedResponse?.secure_url || content,
			messageType,
		});

		let chat: IChatDocument | null = await Chat.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!chat) {
			chat = await Chat.create({
				participants: [senderId, receiverId],
				messages: [newMessage._id],
			});
		} else {
      chat.messages.push(newMessage._id as Types.ObjectId);
			await chat.save();
		}

		revalidatePath(`/chat/${receiverId}`);

		// Alternative usage for the revalidatePath function:
		// revalidatePath("/chat/[id]","page")

		return newMessage;
	} catch (error: any) {
		console.error("Error in sendMessage:", error.message);
		throw error;
	}
};
