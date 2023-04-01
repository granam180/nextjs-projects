"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

type Props = {
  chatId: string;  // used in chat/[id] `wildcard` page
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(  // push messages to firebase
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  // flexbox is set in the ChatID wildcard page
  return <div className="flex-1 overflow-y-auto overflow-x-hidden">
	{messages?.empty && (
		<>
		<p className="mt-10 text-center text-white">
			Type a prompt in below to get started!
		</p>
		{/* animated arrow-down-circle icon prompting user to get started */}
		<ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
		</>
	)}

	{messages?.docs.map((message) => (
		<Message key={message.id} message={message.data()} />
	))}

  </div>;
}

export default Chat;
