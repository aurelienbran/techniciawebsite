import { Document } from '../../types/document';
import { VectorIndexParams } from '../../types/vector';
import { AppError } from '../../utils/errorUtils';
import { generateEmbeddings } from './embeddings';

const VECTOR_API_ENDPOINT = 'http://localhost:6333';

export async function indexDocument(document: Document): Promise<void> {
  try {
    const embeddings = await generateEmbeddings(document.content);
    
    const indexParams: VectorIndexParams = {
      id: document.id,
      vectors: embeddings,
      metadata: {
        title: document.title,
        type: document.type,
        timestamp: new Date().toISOString(),
      },
    };

    const response = await fetch(`${VECTOR_API_ENDPOINT}/index`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(indexParams),
    });

    if (!response.ok) {
      throw new AppError('Document indexing failed', 'VECTOR_INDEX_ERROR', response.status);
    }
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Vector database connection failed', 'VECTOR_DB_CONNECTION_ERROR', 500);
  }
}