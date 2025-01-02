import React, { useEffect, useRef } from 'react';
import { Message as MessageType } from '../../types/chat';
import { ChatBubble } from './ChatBubble';
import { LoadingIndicator } from './LoadingIndicator';

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};