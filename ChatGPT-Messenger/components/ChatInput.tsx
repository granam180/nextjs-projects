"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
	chatId: string;
};

function ChatInput({ chatId }: Props) {
	const [prompt, setPrompt] = useState<string>("");
	const { data: session } = useSession();

	// useSWR to get model
	// const model = "text-davinci-003";
	const { data: model } = useSWR("model", {  // get access to OpenAI API Models
		fallbackData: "text-davinci-003",
	  });

	// sending the message to Firebase Cloud project
	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!prompt) return;

		const input = prompt.trim();
		setPrompt("");

		const message: Message = {
			text: input,
			createdAt: serverTimestamp(),
			user: {
				_id: session?.user?.email!,
				name: session?.user?.name!,
				avatar:
					session?.user?.image! ||
					`https://ui-avatars.com/api/?name=${session?.user?.name}`,
			},
		};
		await addDoc(  // add to firebase from the 'client'
			collection(
				db,
				"users",
				session?.user?.email!,
				"chats",
				chatId,
				"messages"
			),
			message
		);
		// Toast notification to say Loading!

		const notification = toast.loading('BaddGPT is thinking...')

		await fetch(`/api/askQuestion`, {
			method: "POST",  // the 'client' then queries our own API
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: input,
				chatId,
				model,
				session,
			}),
		}).then(() => {
			// Toast notification to say successful...
			toast.success('BaddGPT has responded!', {
				id: notification,
			});
		});
	};

	return (
		// flexbox is set in the ChatID wildcard page
		// bg gray of 700 with a 50% opacity
		<div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
			<form onSubmit={sendMessage} className="p-5 space-x-5 flex">
				<input
					className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"  // disable if there is no input
					disabled={!session}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					type="text"
					placeholder="Type your message here..."
				/>

				<button
					disabled={!prompt || !session}
					type="submit"
					className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
					<PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
				</button>
			</form>

			{/* show model at the bottom of the form / hide model selection on larger screens */}
			<div className="md:hidden">
				<ModelSelection />
			</div>
		</div>
	);
}

export default ChatInput;
