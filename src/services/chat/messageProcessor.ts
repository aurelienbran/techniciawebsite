import { Message, MessageContext } from '../../types/chat';
import { sendMessageToClaude } from '../claude/client';
import { searchVectors } from '../vectorDb/client';
import { AppError } from '../../utils/errorUtils';

export async function processMessage(
  content: string,
  context?: MessageContext
): Promise<Message> {
  try {
    // Search for relevant documents
    const searchResults = await searchVectors({
      query: content,
      limit: 3,
      threshold: 0.7,
    });

    // Add relevant context to the prompt
    const contextualContent = searchResults.matches.length > 0
      ? `Context from relevant documents:\n${
          searchResults.matches
            .map(m => m.metadata.content)
            .join('\n\n')
        }\n\nUser question: ${content}`
      : content;

    // Process with Claude AI
    const response = await sendMessageToClaude(contextualContent);
    
    return {
      ...response,
      context: {
        type: context?.type || 'help',
        relatedDocuments: searchResults.matches.map(m => m.id),
      },
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to process message', 'MESSAGE_PROCESSING_ERROR', 500);
  }
}