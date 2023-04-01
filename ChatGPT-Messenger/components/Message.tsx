import { DocumentData } from "firebase/firestore";
import React from "react";

type Props = {
  message: DocumentData;
};

// start utilizing type definitions from Message
function Message({ message }: Props) {
    const isChatGPT = message.user.name === "ChatGPT";
    const chatBgColorClass = isChatGPT ? "bg-blue-500" : "bg-green-500";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="" className="h-8 w-8" />
        <p className="pt-1 text-sm">
            {message.text}
        </p>
      </div>
    </div>
  );
}

export default Message;
