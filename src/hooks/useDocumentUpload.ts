import { useState, useCallback } from 'react';
import { uploadDocument } from '../services/api/documentApi';
import { DocumentUploadStatus } from '../types/document';

export function useDocumentUpload() {
  const [status, setStatus] = useState<DocumentUploadStatus>({
    status: 'idle',
    progress: 0,
  });

  const upload = useCallback(async (file: File) => {
    setStatus({ status: 'uploading', progress: 0 });

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setStatus(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 500);

      const result = await uploadDocument(file);
      
      clearInterval(interval);
      setStatus({ status: 'complete', progress: 100 });
      
      return result;
    } catch (error) {
      setStatus({
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Upload failed',
      });
      throw error;
    }
  }, []);

  return {
    status,
    upload,
  };
}