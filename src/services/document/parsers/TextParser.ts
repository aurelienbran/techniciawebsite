```typescript
import { BaseParser } from './BaseParser';
import { AppError } from '../../../utils/errorUtils';

export class TextParser implements BaseParser {
  readonly requiresOCR = false;

  async parse(file: File): Promise<string> {
    try {
      return await file.text();
    } catch (error) {
      throw new AppError(
        'Failed to parse text file',
        'TEXT_PARSING_ERROR',
        500
      );
    }
  }
}
```