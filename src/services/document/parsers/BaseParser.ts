```typescript
export interface BaseParser {
  parse(file: File): Promise<string>;
  readonly requiresOCR: boolean;
}
```