import React from 'react';
import { Message } from '../../types/chat';
import { Bot, User } from 'lucide-react';
import { MessageContent } from './MessageContent';

interface ChatBubbleProps {
  message: Message;
  onActionClick?: (action: string) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onActionClick }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-blue-600" />
        ) : (
          <Bot className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div className={`flex-1 max-w-[80%] rounded-lg px-4 py-2 ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-white border border-gray-200'
      }`}>
        <MessageContent 
          content={message.content} 
          isUser={isUser}
          onActionClick={onActionClick}
        />
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};