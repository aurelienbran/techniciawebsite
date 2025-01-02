import { Message } from '../../types/chat';
import { API_CONFIG } from './config';

export async function sendChatMessage(content: string): Promise<Message> {
  const response = await fetch(`${API_CONFIG.baseUrl}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}