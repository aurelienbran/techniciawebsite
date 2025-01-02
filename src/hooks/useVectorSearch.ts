import { useState } from 'react';
import { SearchResult } from '../types/document';
import { searchVectors } from '../services/vectorDb/client';
import { useDebounce } from './useDebounce';
import { useToast } from './useToast';

export function useVectorSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { show } = useToast();
  const debouncedSearch = useDebounce(search, 300);

  async function search(query: string) {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchVectors({
        query,
        limit: 5,
        threshold: 0.7,
      });
      
      setResults(searchResults.matches.map(match => ({
        document: match.metadata,
        similarity: match.score,
      })));
    } catch (error) {
      show('Failed to search documents', 'error');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  return {
    results,
    isSearching,
    search: debouncedSearch,
  };
}