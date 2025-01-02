import React, { useCallback } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ErrorMessage } from './ErrorMessage';
import { useChat } from '../../hooks/useChat';
import { ChatHeader } from './ChatHeader';

export const ChatContainer: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearError } = useChat();

  const handleQuickAction = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        {error && <ErrorMessage message={error} onDismiss={clearError} />}
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
          onActionClick={handleQuickAction}
        />
        <MessageInput onSend={sendMessage} disabled={isLoading} />
      </main>
    </div>
  );
};