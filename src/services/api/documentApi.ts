import { Document } from '../../types/document';
import { API_CONFIG } from './config';

export async function uploadDocument(file: File): Promise<Document> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.documents}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload document');
  }

  return response.json();
}

export async function getDocuments(): Promise<Document[]> {
  const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.documents}`);

  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }

  return response.json();
}

export async function deleteDocument(id: string): Promise<void> {
  const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.documents}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
}