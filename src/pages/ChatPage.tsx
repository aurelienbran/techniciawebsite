import React from 'react';
import { ChatContainer } from '../features/chat/ChatContainer';
import { PageHeader } from '../components/layout/PageHeader';

export function ChatPage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="AI Assistant"
        description="Chat with your maintenance AI assistant"
      />
      <div className="flex-1 bg-white rounded-lg shadow">
        <ChatContainer />
      </div>
    </div>
  );
}