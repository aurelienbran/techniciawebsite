export interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'text' | 'image';
  content: string;
  metadata: {
    fileSize: number;
    uploadedAt: Date;
    mimeType: string;
  };
}

export interface DocumentUploadStatus {
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
  error?: string;
}