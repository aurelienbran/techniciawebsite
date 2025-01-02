import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';
import { sendChatMessage } from '../services/api/chatApi';
import { useChatContext } from './chat/useChatContext';
import { useMessageAnalyzer } from './chat/useMessageAnalyzer';

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: 'Hello! How can I help you with maintenance today?',
  timestamp: new Date(),
  status: 'sent',
};

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [INITIAL_MESSAGE],
    isLoading: false,
    error: null,
    context: {
      relatedDocuments: [],
    },
  });

  const { context, updateContext } = useChatContext();
  const { analyzeMessage } = useMessageAnalyzer();

  const sendMessage = useCallback(async (content: string) => {
    const messageContext = analyzeMessage(content);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      status: 'sent',
      context: messageContext,
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await sendChatMessage(content, context);
      updateContext(messageContext);
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, response],
        isLoading: false,
        context: {
          ...context,
          currentTopic: messageContext.type,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to send message',
        isLoading: false,
      }));
    }
  }, [context, updateContext, analyzeMessage]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    sendMessage,
    clearError,
  };
}