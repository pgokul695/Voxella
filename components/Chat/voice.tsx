import { ChatInput } from '@/components/Chat/ChatInput';

// Parent component (e.g., ChatPage.tsx or Home.tsx)
import { useRef, useState } from 'react';
import { ChatInput } from '@/components/ChatInput';
import { Message } from '@/types/chat';

const ChatPage = () => {
  const stopConversationRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleRegenerate = () => {
    // Logic to regenerate messages or restart conversation
  };

  const handleScrollDownClick = () => {
    // Logic to scroll down
  };

  return (
    <div>
      {/* Other chat components or conversation rendering */}
      <ChatInput
        onSend={handleSend}
        onRegenerate={handleRegenerate}
        onScrollDownClick={handleScrollDownClick}
        stopConversationRef={stopConversationRef}
        textareaRef={textareaRef}
        showScrollDownButton={showScrollDownButton}
      />
    </div>
  );
};

export default ChatPage;

