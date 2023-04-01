"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

function NewChatLink() {
	const router = useRouter();
	const { data: session } = useSession();
	// This creates a fragment that contains two nested elements. The first element is the <strong> tag, and the second is a plain text string that contains the rest of the label.
	const examples = [
		{ message: "Click here to get started. Whad'ya wanna know? I'm an open book, ask me anything", label: <><strong>Click here</strong> to get started! I'm an open book, ask me anything.<br /> It's not weird 😉</>},
		{ message: "Write a resume template for [job title] + [years of experience] with an objective tied to these [skills]", label: "Write a resume template for [job title] + [years of experience] with an objective tied to these [skills]" },    
		{ message: "List the differences between being sympathetic vs empathetic", label: "List the differences between being sympathetic vs empathetic" },
	  ];

	// decoupling
	const createNewChat = async () => {
		const doc = await addDoc(  // modular approach
			collection(db, "users", session?.user?.email!, "chats"), // noSQL style structure that adds to Firebase db when adding a new chat!!!
			{
				userId: session?.user?.email!,
				createdAt: serverTimestamp(),
			}
		);
		router.push(`/chat/${doc.id}`);  // push to firebase
	};

	// Here, we are mapping through the examples array and creating a Link element for each one. 
	// We are also passing the "message" parameter to the URL using template literals. 
	// Finally, we are wrapping the NewChat component inside each Link element so that clicking on it opens a new chat window.
	return (
		<div onClick={createNewChat}>
			{examples.map((example) => (
              <Link
                key={example.message}
                href={`/chat/${encodeURIComponent(example.message)}`}
                passHref
              >
                <p className="infoText mb-2">{example.label}</p>
              </Link>
            ))}     
		</div>
	);
}

export default NewChatLink;
