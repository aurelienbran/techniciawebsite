import React from 'react';
import { Document } from '../../types/document';
import { X } from 'lucide-react';

interface DocumentPreviewProps {
  document: Document;
  onClose: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onClose,
}) => {
  const renderContent = () => {
    switch (document.type) {
      case 'pdf':
        return (
          <iframe
            src={`data:application/pdf;base64,${document.content}`}
            className="w-full h-full"
            title={document.title}
          />
        );
      case 'image':
        return (
          <img
            src={`data:${document.metadata.mimeType};base64,${document.content}`}
            alt={document.title}
            className="max-w-full max-h-full object-contain"
          />
        );
      case 'text':
        return (
          <pre className="whitespace-pre-wrap font-mono text-sm p-4">
            {document.content}
          </pre>
        );
      default:
        return <p>Preview not available</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{document.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};