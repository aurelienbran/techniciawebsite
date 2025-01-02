import React, { useState } from 'react';
import { DocumentUpload } from '../components/documents/DocumentUpload';
import { DocumentList } from '../components/documents/DocumentList';
import { DocumentViewer } from '../components/documents/DocumentViewer';
import { useDocuments } from '../hooks/useDocuments';
import { Document } from '../types/document';
import { Upload } from 'lucide-react';

export const DocumentManagement: React.FC = () => {
  const { documents, isLoading, uploadDocument, deleteDocument } = useDocuments();
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Document Management</h1>
        <p className="text-gray-600">
          Upload and manage technical documentation for maintenance procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              onView={setViewingDoc}
            />
          </div>
        </div>
      </div>

      {viewingDoc && (
        <DocumentViewer
          document={viewingDoc}
          onClose={() => setViewingDoc(null)}
        />
      )}
    </div>
  );
}