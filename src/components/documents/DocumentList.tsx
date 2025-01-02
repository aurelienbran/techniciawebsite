import React from 'react';
import { Document } from '../../types/document';
import { FileText, Trash2, ExternalLink } from 'lucide-react';
import { formatFileSize } from '../../utils/fileUtils';

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string) => void;
  onView: (doc: Document) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDelete,
  onView,
}) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No documents uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{doc.title}</h3>
              <p className="text-sm text-gray-500">
                {formatFileSize(doc.metadata.fileSize)} • {doc.type.toUpperCase()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onView(doc)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="View document"
            >
              <ExternalLink className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(doc.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete document"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}