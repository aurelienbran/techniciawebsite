import React from 'react';
import { Document } from '../../types/document';
import { X } from 'lucide-react';

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">{document.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {document.type === 'pdf' ? (
            <iframe
              src={`data:application/pdf;base64,${document.content}`}
              className="w-full h-full"
              title={document.title}
            />
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {document.content}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}