```typescript
import { Document } from '../../../types/document';
import { getParser } from '../parsers';
import { validateFile } from '../validators';
import { generateEmbeddings } from '../../vectorDb/embeddings';
import { indexDocument } from '../../vectorDb/client';
import { AppError } from '../../../utils/errorUtils';

export class DocumentProcessor {
  async processDocument(file: File): Promise<Document> {
    try {
      // Validate file
      validateFile(file);
      
      // Get appropriate parser
      const parser = getParser(file.type);
      
      // Parse content
      const content = await parser.parse(file);
      
      // Generate embeddings
      const embeddings = await generateEmbeddings(content);

      // Create document
      const document = this.createDocument(file, content);

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

  private createDocument(file: File, content: string): Document {
    return {
      id: crypto.randomUUID(),
      title: file.name,
      content,
      type: this.getDocumentType(file.type),
      metadata: {
        fileSize: file.size,
        uploadedAt: new Date(),
        mimeType: file.type,
      }
    };
  }

  private getDocumentType(mimeType: string) {
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('image')) return 'image';
    return 'text';
  }
}
```