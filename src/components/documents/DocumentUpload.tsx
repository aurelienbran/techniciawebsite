import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { DocumentUploadStatus } from '../../types/document';

interface DocumentUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  maxSize?: number;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUpload,
  accept = '.pdf,.txt',
  maxSize = 10 * 1024 * 1024, // 10MB
}) => {
  const [status, setStatus] = useState<DocumentUploadStatus>({
    status: 'idle',
    progress: 0,
  });

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) await handleFile(file);
    },
    [onUpload]
  );

  const handleFile = async (file: File) => {
    if (file.size > maxSize) {
      setStatus({
        status: 'error',
        progress: 0,
        error: 'File size exceeds limit',
      });
      return;
    }

    setStatus({ status: 'uploading', progress: 0 });
    
    try {
      await onUpload(file);
      setStatus({ status: 'complete', progress: 100 });
    } catch (error) {
      setStatus({
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
    >
      <input
        type="file"
        accept={accept}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop a file here, or click to select
        </p>
      </label>
      
      {status.status !== 'idle' && (
        <div className="mt-4">
          {status.status === 'error' ? (
            <p className="text-red-600 text-sm">{status.error}</p>
          ) : (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${status.progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};