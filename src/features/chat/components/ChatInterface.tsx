import React, { useState } from 'react';
import { Message } from '../../../types/chat';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChatMessages } from '../hooks/useChatMessages';
import { Loader2 } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChatMessages();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages messages={messages} />
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing your request...
          </div>
        )}
      </div>
      <div className="border-t p-4">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};