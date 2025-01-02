import { Document, ProcessingStatus } from '../types/document';

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getDocumentIcon(type: Document['type']): string {
  switch (type) {
    case 'pdf':
      return '📄';
    case 'text':
      return '📝';
    case 'image':
      return '🖼️';
    default:
      return '📎';
  }
}

export function validateDocument(file: File): string | null {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'text/plain', 'image/png', 'image/jpeg'];

  if (file.size > maxSize) {
    return 'File size exceeds 10MB limit';
  }

  if (!allowedTypes.includes(file.type)) {
    return 'Unsupported file type';
  }

  return null;
}