import React from 'react';
import { ProcessingStatus } from '../../types/document';
import { Loader2 } from 'lucide-react';

interface UploadProgressProps {
  status: ProcessingStatus;
  fileName: string;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ status, fileName }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-3">
        {status.status === 'processing' && (
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        )}
        <div className="flex-1">
          <p className="font-medium text-gray-900">{fileName}</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${status.progress}%` }}
            />
          </div>
        </div>
      </div>
      {status.error && (
        <p className="mt-2 text-sm text-red-600">{status.error}</p>
      )}
    </div>
  );
};