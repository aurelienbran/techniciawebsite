import React, { useState } from 'react';
import { DocumentUpload } from './DocumentUpload';
import { DocumentList } from './DocumentList';
import { DocumentViewer } from './DocumentViewer';
import { useDocuments } from '../../hooks/useDocuments';
import { Document } from '../../types/document';
import { Plus } from 'lucide-react';

export const DocumentManagement: React.FC = () => {
  const { documents, isLoading, uploadDocument, deleteDocument } = useDocuments();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload and manage technical documentation and maintenance procedures
          </p>
        </div>
        <button
          onClick={() => document.getElementById('file-upload')?.click()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Upload Document
            </h2>
            <DocumentUpload
              onUpload={uploadDocument}
              accept=".pdf,.txt,.md"
              maxSize={10 * 1024 * 1024} // 10MB
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Document Library
            </h2>
            <DocumentList
              documents={documents}
              onDelete={deleteDocument}
              onView={setSelectedDocument}
            />
          </div>
        </div>
      </div>

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};