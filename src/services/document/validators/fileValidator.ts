```typescript
import { AppError } from '../../../utils/errorUtils';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'text/plain',
  'image/png',
  'image/jpeg'
];

export function validateFile(file: File): void {
  validateFileSize(file.size);
  validateFileType(file.type);
}

function validateFileSize(size: number): void {
  if (size > MAX_FILE_SIZE) {
    throw new AppError(
      'File size exceeds limit',
      'FILE_TOO_LARGE',
      400
    );
  }
}

function validateFileType(type: string): void {
  if (!ALLOWED_TYPES.includes(type)) {
    throw new AppError(
      'Unsupported file type',
      'INVALID_FILE_TYPE',
      400
    );
  }
}
```