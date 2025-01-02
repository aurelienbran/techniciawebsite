import { Document, SearchResult } from '../types/document';

const VECTOR_API_ENDPOINT = 'http://localhost:6333';

export async function searchSimilarDocuments(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${VECTOR_API_ENDPOINT}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to search documents');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Failed to communicate with vector database');
  }
}

export async function indexDocument(document: Document): Promise<void> {
  try {
    const response = await fetch(`${VECTOR_API_ENDPOINT}/index`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(document),
    });

    if (!response.ok) {
      throw new Error('Failed to index document');
    }
  } catch (error) {
    throw new Error('Failed to communicate with vector database');
  }
}