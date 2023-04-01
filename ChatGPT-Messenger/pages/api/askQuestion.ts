// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../lib/queryApi';
import admin from 'firebase-admin';
import { adminDb } from '../../firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>  // response from ChatInput
) {

  // setup and reversing from ChatInput
  const { prompt, chatId, model, session } = req.body;  // strip out all the values passed through

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a chat ID!" });
    return;
  }

  // ChatGPT Query
  const response = await query(prompt, chatId, model);

  // package into a Message
  const message: Message = {  // message 'definitions' display from Message
    text: response || "BaddGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k',
    },
  };

  // add from Admin to the back-end into the Firestore Database
  await adminDb
    .collection('users')
    .doc(session?.user?.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);  // push to firebase

  res.status(200).json({ answer: message.text });
}
