import React, { useRef, useEffect } from 'react';
import { Message } from '../../../types/chat';
import { ChatBubble } from './ChatBubble';
import { LoadingIndicator } from './LoadingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};