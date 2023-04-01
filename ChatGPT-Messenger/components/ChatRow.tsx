import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type Props = {
	id: string;
};

function ChatRow({ id }: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();
	const [active, setActive] = useState(false);

	const [messages] = useCollection(
		collection(db, "users", session?.user?.email!, "chats", id, "messages"),  // a combined query
	);

	useEffect(() => {
		if (!pathname) return;
		setActive(pathname.includes(id));
	}, [pathname]);

	// DELETE CHAT
	const removeChat = async () => {
		await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
		router.replace("/");
	};

	return (
		<Link
			href={`/chat/${id}`}
			// using string interpolation `` to ref ${active} class
			className={`chatRow justify-center ${active && "bg-gray-700/50"}`}>
			<ChatBubbleLeftIcon className="h-5 w-5" />
			<p className="flex-1 hidden md:inline-flex truncate">
				{/* pull last bit of text from the chat, or say `New Chat` */}
				{messages?.docs[messages?.docs.length - 1]?.data().text ||
					"New Chat"}
			</p>
			<TrashIcon
				onClick={removeChat}  // CHAT REMOVED
				className="h-5 w-5 text-gray-700 hover:text-red-700"
			/>
		</Link>
	);
}

export default ChatRow;
