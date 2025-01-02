import { VectorSearchParams, VectorSearchResponse } from '../../types/vector';
import { AppError } from '../../utils/errorUtils';

const QDRANT_API_URL = 'http://localhost:6333';

export async function searchVectors(params: VectorSearchParams): Promise<VectorSearchResponse> {
  try {
    const response = await fetch(`${QDRANT_API_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new AppError('Vector search failed', 'VECTOR_SEARCH_ERROR', response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Vector database connection failed', 'VECTOR_DB_CONNECTION_ERROR', 500);
  }
}

export async function indexDocument(document: Document, embeddings: number[]): Promise<void> {
  try {
    const response = await fetch(`${QDRANT_API_URL}/points/upsert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collection_name: 'maintenance_docs',
        points: [{
          id: document.id,
          vector: embeddings,
          payload: {
            title: document.title,
            type: document.type,
            timestamp: new Date().toISOString(),
          },
        }],
      }),
    });

    if (!response.ok) {
      throw new AppError('Document indexing failed', 'VECTOR_INDEX_ERROR', response.status);
    }
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Vector database connection failed', 'VECTOR_DB_CONNECTION_ERROR', 500);
  }
}