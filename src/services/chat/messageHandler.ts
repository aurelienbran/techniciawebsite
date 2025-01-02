import { Message } from '../../types/chat';
import { processMessage } from './messageProcessor';

export async function handleNewMessage(content: string): Promise<Message> {
  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: 'user',
    content,
    timestamp: new Date(),
  };

  try {
    const assistantMessage = await processMessage(content);
    return assistantMessage;
  } catch (error) {
    throw error;
  }
}