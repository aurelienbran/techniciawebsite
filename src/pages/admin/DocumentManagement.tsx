import React from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import { DocumentUpload } from '../../components/documents/DocumentUpload';
import { DocumentList } from '../../components/documents/DocumentList';
import { SearchBar } from '../../components/search/SearchBar';
import { useVectorSearch } from '../../hooks/useVectorSearch';
import { Plus, Search } from 'lucide-react';

export const DocumentManagement: React.FC = () => {
  const { documents, uploadDocument, removeDocument } = useDocuments();
  const { results, isSearching, search } = useVectorSearch();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Upload New Document</h2>
          <DocumentUpload
            onUpload={uploadDocument}
            accept=".pdf,.txt,.md,.doc,.docx"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Search Documents</h2>
          <SearchBar
            onSearch={search}
            placeholder="Search documentation..."
            icon={Search}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Document Library
          </h3>
          <DocumentList
            documents={isSearching ? [] : (results.length ? results.map(r => r.document) : documents)}
            onRemove={removeDocument}
            isLoading={isSearching}
          />
        </div>
      </div>
    </div>
  );
};