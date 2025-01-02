```typescript
import { TextParser } from './TextParser';
import { PDFParser } from './PDFParser';
import { ImageParser } from './ImageParser';
import { BaseParser } from './BaseParser';
import { AppError } from '../../../utils/errorUtils';

const PARSERS: Record<string, new () => BaseParser> = {
  'text/plain': TextParser,
  'application/pdf': PDFParser,
  'image/png': ImageParser,
  'image/jpeg': ImageParser,
};

export function getParser(mimeType: string): BaseParser {
  const ParserClass = PARSERS[mimeType];
  if (!ParserClass) {
    throw new AppError(
      `No parser available for type: ${mimeType}`,
      'PARSER_NOT_FOUND',
      400
    );
  }
  return new ParserClass();
}
```