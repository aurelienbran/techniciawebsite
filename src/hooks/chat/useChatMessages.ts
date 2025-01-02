import { useState, useCallback } from 'react';
import { Message } from '../../types/chat';
import { handleNewMessage } from '../../services/chat/messageHandler';
import { useToast } from '../useToast';

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { show } = useToast();

  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsLoading(true);
      
      // Add user message immediately
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Process with Claude AI and get response
      const assistantMessage = await handleNewMessage(content);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      show(
        error instanceof Error ? error.message : 'Failed to send message',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  }, [show]);

  return {
    messages,
    isLoading,
    sendMessage,
  };
}