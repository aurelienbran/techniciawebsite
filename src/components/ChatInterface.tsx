```typescript
import React from 'react';
import { ChatContainer } from './chat/ChatContainer';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col max-h-[calc(100vh-4rem)]">
      <ChatContainer />
    </div>
  );
};

export default ChatInterface;
```