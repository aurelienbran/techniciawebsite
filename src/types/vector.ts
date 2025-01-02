export interface VectorSearchParams {
  query: string;
  limit?: number;
  threshold?: number;
  filters?: Record<string, unknown>;
}

export interface VectorSearchMatch {
  id: string;
  score: number;
  metadata: {
    title: string;
    type: string;
    timestamp: string;
    [key: string]: unknown;
  };
}

export interface VectorSearchResponse {
  matches: VectorSearchMatch[];
  took: number;
}