import { useState, useCallback } from 'react';
import { ProcessingStatus } from '../types/document';
import { validateFileSize, validateFileType } from '../utils/validation';
import { AppError } from '../utils/errorUtils';

interface UploadState {
  status: Record<string, ProcessingStatus>;
  error: string | null;
}

export function useUpload() {
  const [state, setState] = useState<UploadState>({
    status: {},
    error: null,
  });

  const upload = useCallback(async (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'text/plain', 'image/png', 'image/jpeg'];

    if (!validateFileSize(file.size, maxSize)) {
      throw new AppError('File size exceeds 10MB limit', 'FILE_TOO_LARGE', 400);
    }

    if (!validateFileType(file.type, allowedTypes)) {
      throw new AppError('Unsupported file type', 'INVALID_FILE_TYPE', 400);
    }

    const uploadId = crypto.randomUUID();

    setState(prev => ({
      ...prev,
      status: {
        ...prev.status,
        [uploadId]: { status: 'processing', progress: 0 },
      },
    }));

    try {
      // Simulated upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setState(prev => ({
          ...prev,
          status: {
            ...prev.status,
            [uploadId]: { status: 'processing', progress },
          },
        }));
      }

      setState(prev => ({
        ...prev,
        status: {
          ...prev.status,
          [uploadId]: { status: 'completed', progress: 100 },
        },
      }));

      return uploadId;
    } catch (error) {
      setState(prev => ({
        ...prev,
        status: {
          ...prev.status,
          [uploadId]: {
            status: 'error',
            progress: 0,
            error: error instanceof Error ? error.message : 'Upload failed',
          },
        },
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    upload,
  };
}