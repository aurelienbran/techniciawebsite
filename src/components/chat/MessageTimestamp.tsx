import React from 'react';
import { MessageStatus } from '../../types/chat';
import { Check, CheckCheck } from 'lucide-react';

interface MessageTimestampProps {
  timestamp: Date;
  isUser: boolean;
  status?: MessageStatus;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({ 
  timestamp, 
  isUser,
  status 
}) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(timestamp);

  return (
    <div className={`text-xs mt-1 flex items-center gap-1 ${
      isUser ? 'text-blue-200' : 'text-gray-500'
    }`}>
      {formattedTime}
      {isUser && status && (
        <span className="ml-1">
          {status === 'sent' ? (
            <CheckCheck className="w-3 h-3" />
          ) : status === 'sending' ? (
            <Check className="w-3 h-3 opacity-50" />
          ) : null}
        </span>
      )}
    </div>
  );
};