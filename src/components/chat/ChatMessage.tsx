import React from 'react';
import { Message } from '../../types/chat';
import { MessageContent } from './MessageContent';
import { MessageTimestamp } from './MessageTimestamp';
import { RetryButton } from './RetryButton';
import { Wrench } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onRetry?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRetry }) => {
  const isUser = message.role === 'user';
  const isPending = message.status === 'sending';
  const isError = message.status === 'error';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Wrench className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="relative">
          <MessageContent content={message.content} isUser={isUser} />
          <div className="flex items-center justify-between gap-2">
            <MessageTimestamp 
              timestamp={message.timestamp} 
              isUser={isUser}
              status={message.status}
            />
            {isError && onRetry && (
              <RetryButton onClick={onRetry} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};