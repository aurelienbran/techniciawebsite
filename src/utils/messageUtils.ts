import { Message } from '../types';

export const generateMessageId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const createMessage = (role: 'user' | 'assistant', content: string): Message => {
  return {
    id: generateMessageId(),
    role,
    content,
    timestamp: new Date(),
  };
};