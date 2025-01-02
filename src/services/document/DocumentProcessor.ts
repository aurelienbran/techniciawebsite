```typescript
import { Document, DocumentType } from '../../types/document';
import { generateEmbeddings } from '../vectorDb/embeddings';
import { indexDocument } from '../vectorDb/client';
import { AppError } from '../../utils/errorUtils';

export class DocumentProcessor {
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly ALLOWED_TYPES = [
    'application/pdf',
    'text/plain',
    'image/png',
    'image/jpeg'
  ];

  async processDocument(file: File): Promise<Document> {
    try {
      // Validate file
      this.validateFile(file);

      // Extract text content
      const content = await this.extractContent(file);

      // Generate embeddings
      const embeddings = await generateEmbeddings(content);

      // Create document
      const document: Document = {
        id: crypto.randomUUID(),
        title: file.name,
        type: this.getDocumentType(file.type),
        content,
        metadata: {
          fileSize: file.size,
          uploadedAt: new Date(),
          mimeType: file.type,
        }
      };

      // Index document with embeddings
      await indexDocument(document, embeddings);

      return document;
    } catch (error) {
      throw new AppError(
        'Document processing failed',
        'DOCUMENT_PROCESSING_ERROR',
        500
      );
    }
  }

  private validateFile(file: File): void {
    if (file.size > this.MAX_FILE_SIZE) {
      throw new AppError(
        'File size exceeds limit',
        'FILE_TOO_LARGE',
        400
      );
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      throw new AppError(
        'Unsupported file type',
        'INVALID_FILE_TYPE',
        400
      );
    }
  }

  private async extractContent(file: File): Promise<string> {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (file.type === 'application/pdf') {
        // For PDFs, we'll send to the server for processing
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    });
  }

  private getDocumentType(mimeType: string): DocumentType {
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('image')) return 'image';
    return 'text';
  }
}
```