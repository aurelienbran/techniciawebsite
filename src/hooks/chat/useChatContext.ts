import { useState, useCallback } from 'react';
import { MessageContext } from '../../types/chat';

interface ChatContext {
  currentTopic?: string;
  activeRequest?: string;
  relatedDocuments: string[];
}

export function useChatContext() {
  const [context, setContext] = useState<ChatContext>({
    relatedDocuments: [],
  });

  const updateContext = useCallback((messageContext: MessageContext) => {
    setContext(prev => ({
      currentTopic: messageContext.type,
      activeRequest: messageContext.previousRequestId || prev.activeRequest,
      relatedDocuments: [
        ...new Set([
          ...(messageContext.relatedDocuments || []),
          ...prev.relatedDocuments,
        ]),
      ].slice(0, 5), // Keep only 5 most recent related documents
    }));
  }, []);

  const clearContext = useCallback(() => {
    setContext({ relatedDocuments: [] });
  }, []);

  return {
    context,
    updateContext,
    clearContext,
  };
}