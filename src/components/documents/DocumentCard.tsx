import React from 'react';
import { Document } from '../../types/document';
import { formatFileSize, getDocumentIcon } from '../../utils/documentUtils';
import { formatDate } from '../../utils/dateUtils';
import { Trash2 } from 'lucide-react';

interface DocumentCardProps {
  document: Document;
  onRemove: (id: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl" role="img" aria-label={document.type}>
            {getDocumentIcon(document.type)}
          </span>
          <div>
            <h3 className="font-medium text-gray-900 line-clamp-1">{document.title}</h3>
            <p className="text-sm text-gray-500">
              {formatFileSize(document.metadata.fileSize)} • 
              {formatDate(document.metadata.uploadedAt)}
            </p>
          </div>
        </div>
        <button
          onClick={() => onRemove(document.id)}
          className="text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Remove document"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};