import { Message } from '../types/chat';

const API_ENDPOINT = 'http://localhost:8001';

export async function sendMessage(content: string): Promise<Message> {
  try {
    const response = await fetch(`${API_ENDPOINT}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Failed to communicate with the server');
  }
}