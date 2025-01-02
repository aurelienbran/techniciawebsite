import { Message } from '../../types/chat';
import { AppError } from '../../utils/errorUtils';

const CLAUDE_API_URL = 'http://localhost:8001/chat';
const CLAUDE_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

interface ClaudeResponse {
  id: string;
  content: string;
  role: 'assistant';
}

export async function sendMessageToClaude(
  content: string,
  context?: { previousMessages?: Message[] }
): Promise<Message> {
  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CLAUDE_API_KEY,
      },
      body: JSON.stringify({
        messages: [
          ...(context?.previousMessages?.map(m => ({
            role: m.role,
            content: m.content,
          })) || []),
          { role: 'user', content },
        ],
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new AppError(
        'Failed to communicate with Claude AI',
        'CLAUDE_API_ERROR',
        response.status
      );
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new AppError(
        'Streaming not supported',
        'STREAMING_ERROR',
        500
      );
    }

    let responseContent = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = new TextDecoder().decode(value);
      responseContent += chunk;
    }

    const claudeResponse: ClaudeResponse = JSON.parse(responseContent);

    return {
      id: claudeResponse.id,
      role: 'assistant',
      content: claudeResponse.content,
      timestamp: new Date(),
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Failed to process message with Claude AI',
      'CLAUDE_PROCESSING_ERROR',
      500
    );
  }
}