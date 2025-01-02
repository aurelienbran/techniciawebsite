import { useState, useCallback } from 'react';
import { Document } from '../types/document';
import * as documentApi from '../services/api/documentApi';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      const docs = await documentApi.getDocuments();
      setDocuments(docs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(async (file: File) => {
    try {
      const doc = await documentApi.uploadDocument(file);
      setDocuments(prev => [...prev, doc]);
      return doc;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to upload document');
    }
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    try {
      await documentApi.deleteDocument(id);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete document');
    }
  }, []);

  return {
    documents,
    isLoading,
    error,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
  };
}