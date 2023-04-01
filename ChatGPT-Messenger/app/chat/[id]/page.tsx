import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
// chat/[id] -> CHAT_PAGE WILDCARD

type Props = {
  params: {
    id: string;
  };
};

// function ChatPage(props) {
// console.log(props);
function ChatPage({ params: { id } }: Props) {  // enforcing Props
  return (
    // Scrollable div
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
