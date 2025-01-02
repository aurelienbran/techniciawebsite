import { AppError } from '../../utils/errorUtils';

const VOYAGE_API_URL = 'https://api.voyageai.com/v1/embeddings';
const VOYAGE_API_KEY = import.meta.env.VITE_VOYAGE_API_KEY;

export async function generateEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await fetch(VOYAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({ input: text }),
    });

    if (!response.ok) {
      throw new AppError('Embedding generation failed', 'EMBEDDING_ERROR', response.status);
    }

    const { data } = await response.json();
    return data[0].embedding;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Embedding service connection failed', 'EMBEDDING_SERVICE_ERROR', 500);
  }
}