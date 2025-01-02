import React from 'react';
import { SearchResult } from '../../types/document';
import { FileText, Image, FileCode } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface SearchResultsProps {
  results: SearchResult[];
  isSearching: boolean;
  onResultClick: (result: SearchResult) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isSearching,
  onResultClick,
}) => {
  if (isSearching) {
    return (
      <div className="p-4 text-center text-gray-500">
        Searching documents...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No matching documents found
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-green-500" />;
      default:
        return <FileCode className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-2">
      {results.map((result) => (
        <button
          key={result.document.id}
          onClick={() => onResultClick(result)}
          className="w-full p-3 flex items-start space-x-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {getIcon(result.document.type)}
          <div className="flex-1 text-left">
            <h3 className="font-medium text-gray-900">
              {result.document.title}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDate(result.document.metadata.uploadedAt)}
            </p>
          </div>
          <span className="text-sm text-gray-400">
            {Math.round(result.similarity * 100)}% match
          </span>
        </button>
      ))}
    </div>
  );
};