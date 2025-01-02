import React from 'react';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { useChatMessages } from './hooks/useChatMessages';

export const ChatContainer: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChatMessages();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      <div className="border-t bg-white p-4">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};